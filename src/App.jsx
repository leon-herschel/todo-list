import './App.css'
import { useState } from "react"

function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editedTodo, setEditedTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo])
      setNewTodo('')
    }
  }

  const deleteTodo = (index) => {
    const updatedTodos = [...todos]
    updatedTodos.splice(index, 1)
    setTodos(updatedTodos)
  }

  const startEdit = (index, todo) => {
    setEditIndex(index)
    setEditedTodo(todo)
  }

  const cancelEdit = () => {
    setEditIndex(null)
    setEditedTodo('')
  }

  const saveEdit = () => {
    const updatedTodos = [...todos]
    updatedTodos[editIndex] = editedTodo
    setTodos(updatedTodos)
    setEditIndex(null)
    setEditedTodo('')
  }

  return (
    <div>
      <input type="text" placeholder="What do you need to do?" value={newTodo} 
      onChange={(e) => setNewTodo(e.target.value)}/>
      <button className="add-button" onClick={addTodo}> Add </button>
      <ul>
        {todos.map((todo, index) => (<li key={index} className="todo-item">
            {editIndex !== index && (<div className="list-text">{todo}</div>)}
            <div className="button-container">
              {editIndex === index ? (
                <>
                  <input type="text" value={editedTodo} onChange={(e) => setEditedTodo(e.target.value)}/>
                  <button className="edit-button" onClick={saveEdit}>
                    Save
                  </button>
                  <button className="cancel-button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="edit-button" onClick={() => startEdit(index, todo)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteTodo(index)}>
                    Done
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
  
}

function App() {
  return (
    <div className='app-container'>
      <div className='app-name'>
        <h1 className='first-word'>ToDo</h1>
        <h1 className='second-word'>List</h1>
      </div>
      <div className='list-container'>
        <TodoList />
      </div>
    </div>
  )
}

export default App
