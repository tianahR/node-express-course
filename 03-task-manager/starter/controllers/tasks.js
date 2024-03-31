const Task = require('../models/tasks') //schema

const getAllTasks = async (req,res)=>{
    
    // res.send('get all Tasks')
    try{
        const tasks = await Task.find({})//filter object empty as we want to get all documents
        res.status(200).json({tasks}) // response if successful, sending tasks 

    }
    catch(error){
        res.status(500).json({msg:error})

    }
}

const createTask = async (req, res) => {

    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})

    }
    catch(error){
        res.status(500).json({msg:error})

    }
   
  }

const getTask = async (req,res)=>{

    try{

        const {id:taskID} = req.params ;
        const task = await Task.findOne({_id:taskID})

        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
    }
    catch(error){
        res.status(500).json({msg:error})

    }

    
    // res.send('get single task')
   
}



const deleteTask = async(req,res)=>{
    
    try{

        const {id:taskID} = req.params ;
        const task = await Task.findOneAndDelete({_id:taskID})

        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
    }
    catch(error){
        res.status(500).json({msg:error})

    }
}


const updateTask = async (req, res) => {

    try{
        const { id: taskID } = req.params


        // {new:true,runValidators:true} these are options for always getting the new value edited and run the validators
        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body,{new:true,runValidators:true})
      
        if (!task) {
          return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
      
        res.status(200).json({ task })

    }
    catch(error){
        res.status(500).json({msg:error})

    }

   
  }
module.exports =  {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}