const Task = require('../models/tasks') //schema

const asyncWrapper = require('../middleware/async') //refactoring week6 using middleware 

const {createCustomError} = require('../errors/custom-error') //using custom etror message week6

// const getAllTasks = async (req,res)=>{
    
//     // res.send('get all Tasks')
//     try{
//         const tasks = await Task.find({})//filter object empty as we want to get all documents
//         res.status(200).json({tasks}) // response if successful, sending tasks
//         // res.status(200).json({tasks,amount:tasks.length})
//         // res
//         // .status(200)
//         // .json({success:"success", data:{tasks,nbHits:tasks.length}})



//     }
//     catch(error){
//         res.status(500).json({msg:error})

//     }
// }
// ----------------------------------------------------

// refactoring using middleware AsyncWrapper week6

const getAllTasks = asyncWrapper(async (req,res)=>{
    
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})


// -------------------------------

const createTask = asyncWrapper(async (req, res) => {

    
        const task = await Task.create(req.body)
        res.status(201).json({task})

    
   
  })

//   --------------------------------------

const getTask = asyncWrapper(async (req,res,next)=>{

  

        const {id:taskID} = req.params ;
        const task = await Task.findOne({_id:taskID})

        if(!task){

            // const error = new Error('Not Found')
            // error.status = 400 ;
            // return next(error) 

            // use new custom Error class

            return next(createCustomError(`No task with id : ${taskID}`,404))
            // return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
   
   
})

// --------------------------------



const deleteTask = asyncWrapper(async(req,res)=>{
    
    
        const {id:taskID} = req.params ;
        const task = await Task.findOneAndDelete({_id:taskID})

        if(!task){
            // return res.status(404).json({msg:`No task with id : ${taskID}`})
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
    
})
// --------------------------------------------


const updateTask = asyncWrapper(async (req, res) => {

   
        const { id: taskID } = req.params


        // {new:true,runValidators:true} these are options for always getting the new value edited and run the validators
        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body,{new:true,runValidators:true})
      
        if (!task) {
        //   return res.status(404).json({msg:`No task with id : ${taskID}`})
            return next(createCustomError(`No task with id : ${taskID}`,404))
        }
      
        res.status(200).json({ task })

    

   
  })


  
module.exports =  {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    
}