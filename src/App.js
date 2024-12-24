import React, { useEffect, useState } from 'react';
 import axios from 'axios';
function App() {
  const [todo, setTodo]= useState([]);
  const [title, setTitle ] = useState("");
  const [, setId] = useState("")
  
const addTodo = async() =>{
   try {
   const { data } = await axios.post("http://localhost:8080/todo/add", { 
   title,
    });
  if (data.success){
    getAllTodo();
    setTitle("")
  }
    
  }catch(error) {
    console.log(error);
    
   }
};

const deleteTodo = async (id) => {
  try {
    const { date } = await axios.delete(
      "http://localhost:8080/todo/delete/" + id
    );
    if (date.success){
      getAllTodo();
    }
  }catch (error){
    console.log(error); 
  }
};

const getAllTodo = async () => {
  try{
  const { data } = await axios.get("http://localhost:8080/todo/get-all");
     if (data.success) {
     console.log(data);
     setTodo(data.todo)
      
     }
  }catch (error){
    console.log(error);
  }

};



useEffect(() =>{
  getAllTodo();
},[]);


                
 return (
    <div>
      <h1>Todo List</h1>
      <hr/>
      <div>
        <input placeholder='add item...'
        type='text'
       onChange={(e) =>{
        setTitle(e.target.value)
       }}
       value={title}
        />
      </div>
      <div>
        <button onClick={addTodo}> Add</button>
      </div>
      <div>
         {todo.map((value) =>(
          <p key={value.id}>
            {value.title}{" "}
            <button
             onClick={()=>{
              deleteTodo(value.id);
             }}
            >
             Delete
            </button>{" "}
           <button onClick={() =>{
            setTitle(value.title);
            setId(value.id);
           }}>Edit</button>

          </p>
         ))}
      </div>
        




    </div>
  );
}

export default App
