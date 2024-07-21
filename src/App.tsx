import { useState } from 'react'
import './App.css'

interface TodoList {
  name:string,
  editMode:boolean,
  completed:boolean
}

function App() {
  const [todos, settodos] = useState<Array<TodoList>>([]);
  const [task, settask] = useState('');
  const handleAddTask = (): void =>{
    let data: TodoList = {
      name:task,
      editMode:false,
      completed:false
    }
    settodos(prev=> [...prev,data])
    settask('');
  }

  const handleEdit=(value:TodoList,id:number): void=> {
    let data: TodoList = {
      name:value.name,
      editMode:!value.editMode,
      completed:false
    }
    settodos(prev=> prev.map((value, index)=> index === id?  data: value))
  }
  const handleEditTask = (id:number,val:string)=>{

    let data: TodoList = {
      name:val,
      editMode:true,
      completed:false
    }
    settodos(prev=> prev.map((value, index)=> index === id?  data: value))
    // settodos(prev=> prev.filter((value,index)=> id!==index))
  }

  const handleDelete = (id:number)=>{
    settodos(prev=> prev.filter((_val,index)=> index!== id))
  }
  function handleComplete(value:TodoList,id: number): void {
    let data: TodoList = {
      name:value.name,
      editMode:value.editMode,
      completed:!value.completed
    }
    settodos(prev=> prev.map((value, index)=> index === id?  data: value))
  }

  return (
    <>
      <main>
      <header>Todo List</header>
        <section>
          <div>
            <input placeholder='New Task' value={task} onChange={(e)=>settask(e.target.value)}/>
            <button onClick={()=> handleAddTask()}>Add Task</button>
            {todos.length>0 && todos.map((value, id)=>(
              <div key={id}>
                {value.editMode ? (
                  <>
                     <input defaultValue={value.name} onChange={(e)=>handleEditTask(id,e.target.value)}/>
                     <button onClick={()=>handleEdit(value,id)}>Edit</button>
                  </>
                ):(
                  <>
                    <div className={`${value.completed? 'strike':''}`}>
                      {value.name}
                    </div>
                    <button onClick={()=>handleEdit(value,id)}>Edit</button>
                    <button onClick={()=>handleDelete(id)}>Delete</button>
                    <button onClick={()=>handleComplete(value,id)}>Complete</button>
                  </>
                )}
                
              </div>
            ))
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default App
