import {useState, useEffect, useRef} from 'react';
import {v4 as uuid} from 'uuid';
import {randomColor} from 'randomcolor';
import Draggable from 'react-draggable';

import './App.css';

function App() {

  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('todoList')) || []
  );
  
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList]);
  
  const addTodoItem = () => {
    if(todoItem.trim()) {
      const newTodo = {
        id: uuid(),
        todoName: todoItem,
        color: randomColor({
          liminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setTodoList([...todoList, newTodo]);
      setTodoItem('');
    } else {
      alert('Please, enter something...')
    }
  }

  const deleteTodoItem = (id) => {
    const newTodoList = [...todoList].filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }
  
  const updatePos = (data, id) => {
    let newTodoList = [...todoList];
    newTodoList.find(el => el.id === id).defaultPos = {
      x: data.x,
      y: data.y
    }
    setTodoList(newTodoList);
  }
  
  const nodeRef = useRef(null);
  
  return (
    <div className='App'>
      <div className='wrapper'>
        <input type="text"
        placeholder='Enter to do'
        value={todoItem}
        ref={nodeRef}
        onChange={(e) => setTodoItem(e.target.value)}/>
        <button className="enter"
        onClick={addTodoItem}>Enter</button>
      </div>
      
      {
        todoList.map((todoEl) => {
          return (
            <Draggable 
            key={todoEl.id} 
            nodeRef={nodeRef}
            defaultPosition={todoEl.defaultPos}
            onStop={(_, data) => updatePos(data, todoEl.id)}>
              <div 
                className='todo__item' 
                style={{backgroundColor: todoEl.color}}
                >
                  `{todoEl.todoName}`
                <button 
                  className='delete'
                  onClick={() => deleteTodoItem(todoEl.id)}
                >
                  X
                </button>
              </div>
            </Draggable> 
          )
        })
      }
    </div>
  );
}

export default App;
