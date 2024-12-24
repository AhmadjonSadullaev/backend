const express = require("express");
const {v4} = require("uuid");
const cors = require("cors")

const server = express();

server.use(cors({credentials:true, origin: "*"}))
server.use(express.json());

let todo =[
    {id: v4(), title: "lorem1" },
    {id: v4(), title: "lorem2" },
    {id: v4(), title: "lorem3" },
    {id: v4(), title: "lorem4" },
];

server.get("/todo/get-all",(req, res) =>{
   res.status(200).json({success: true, todo});
});

server.post("/todo/add", (req, res) =>{
  const {title} = req.body
  
  todo.push({id: v4(), title});
    res.status(201).json({success:true, msg: "successfully added!"})
});

server.delete("/todo/delete/:id",(req, res) =>{
    const { id } = req.params;

    const new_todo = todo.filter ((val) => val.id !== id);
    
    todo = new_todo;

    res.status(201).json ({success: true, msg : "Successfully deleted"});

})


server.listen(8080, () =>{
    console.log("Server run");  
});