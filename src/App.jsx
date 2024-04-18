import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useState } from 'react';
import { uid } from 'uid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";


const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [todoStatus, setTodoStatus] = useState("all")

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("todos"))
    if (data !== null && data.length > 0) {
      setTodos(data);
      console.log(data);
    } else {
      console.log("No todos");
    }
  }, [])

  const saveTodo = () => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error is :", error);
    }
  }

  useEffect(() => {
    saveTodo()
  }, [todos])


  const onChangeHandler = (e) => {
    setTodo(e.target.value)
  };

  const addTodo = () => {
    todo === "" ? alert("Enter Something") :
      setTodos([...todos, { id: uid(), todo, iscomplete: false }])
    setTodo("")
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const checkHandler = (e) => {
    let id = e.target.name;
    const index = todos.findIndex((item) => {
      return item.id === id
    })
    console.log(index)
    let newTodos = [...todos]
    newTodos[index].iscomplete = !(newTodos[index].iscomplete)
    setTodos(newTodos)
  };

  const editHandler = (id) => {
    let index = todos.findIndex((item) => {
      return item.id === id
    })
    setTodo(todos[index].todo)

    const newTodos = todos.filter((item) => {
      return item.id !== id
    })

    console.log(newTodos);
    setTodos(newTodos)
  };

  const deleteHandler = (id) => {
    const index = todos.findIndex((item) => {
      return item.id === id
    })
    console.log(index);
    const newTodos = todos.filter((item) => {
      return item.id !== id
    })
    console.log(newTodos)
    setTodos(newTodos)
  };

  const todoStatusHandler = (e) => {
    let value = e.target.value
    console.log(value);
    setTodoStatus(value)

  }

  return (
    <>
      <Navbar />

      <div className='min-h-screen bg-black font-Roboto '>
        <div className="container flex p-10 ">
          <input onKeyDown={keyDownHandler} onChange={onChangeHandler} value={todo} type="text" className=' w-1/2 mx-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' />
          <button onClick={addTodo} type="button" className='mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'><MdAddTask /></button>
        </div>

        {todos.length === 0 && <h1 className='  ml-8 bold text-white'>No Todos to Display</h1>}

        {todos.length !== 0 &&
          <select onChange={todoStatusHandler} className=' mb-5 ml-10 p-2 rounded bg-blue-950 text-white' name="todos" >
            <option defaultValue="all" value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>}

        {todos.map((item) => {
          if (todoStatus === "all" || (todoStatus === "completed" && item.iscomplete) || (todoStatus === "not_completed" && !item.iscomplete)) 
          return  (<div key={uid()} className="todocontainer mt-4 ml-8 w-1/2 text-white flex justify-between ">
            <div className="todoScontainer gap-4 flex ">
              <input onChange={checkHandler} checked={item.iscomplete} type="checkbox" name={item.id} id="" />
              <div className={` h-full bg-white  text-black mx-2 rounded-lg p-5 ${item.iscomplete ? "line-through bg-green-300" : ""}`}>{item.todo}</div>
            </div>
            <div className="btns flex  h-full" >

              <button onClick={() => { editHandler(item.id) }} name={item.id} className='mx-2 bg-green-500 hover:bg-green-700 text-white font-bold  p-5 rounded'><FaEdit /></button>
              <button onClick={() => { deleteHandler(item.id) }} name={item.id} className='mx-2 bg-red-500 hover:bg-red-700 text-white font-bold  p-5 rounded '><MdDelete /></button>
            </div>
          </div>)

        })}

      </div>
    </>
  )
}

export default App
