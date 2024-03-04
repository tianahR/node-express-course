const EventEmitter = require('events'); //importing eventEmitter

const customEmitter1 = new EventEmitter() //create an eventEmitter instance

// susbscribing to Events using the on() method, first argument the name of the event, 
// second argument : a callback function to be executed when the event occurs
customEmitter1.on('firstEvent', () => {
    console.log(`This is the first message`)
    customEmitter1.emit('secondEvent', `Hello World`) //emit events using the emit() method
})
customEmitter1.on('secondEvent', (msg) => {
    console.log(`This is the second message : ${msg}`)
})
customEmitter1.emit('firstEvent')

// ------------------------------------


const customEmitter2 = new EventEmitter();  
setInterval(() => {  
    customEmitter2.emit("timer", "hi there");  
}, 2000);  
customEmitter2.on("timer", (msg) => console.log(msg));  

// -----------------

const emitter = new EventEmitter();  
const waitForEvent = () => {  
  return new Promise((resolve) => {  
    emitter.on("happens", (msg) => resolve(msg));  
  });  
};  
const doWait = async () => {  
  const msg = await waitForEvent();  
  console.log("We got an event! Here it is: ", msg);  
};  
doWait();  
emitter.emit("happens", "Hello World!");  

//-----------------
const myEmitter = new EventEmitter();
myEmitter.on('greet',(name)=>{console.log('Hello, ${name}');});
myEmitter.emit('greet','Fara');
myEmitter.on('message',(sender,message)=>{console.log(`${sender} says: ${message}`);});
myEmitter.emit('message','Fara','Hello to my code reviewer!');