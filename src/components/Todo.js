import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Todo = ({ task, EditTodo, DeleteTodo, onChange }) => {
  console.log(task.completed)
  
  const handleEdit = (task) => {

    EditTodo(task);

  };

  const handleDelete = (task) => {

    DeleteTodo(task);

  } 

  const handleCheckboxChange = () => {

    onChange(task.id);
  }
  
  return task.task && (
    <div >
      <ul id='list'>
        <li>
          <div className='checkbox-container'>
            <input type="checkbox" id={task.task}  className='custom-checkbox' onChange={handleCheckboxChange}  checked={task.completed}/>
            {/* <span className="checkmark"></span> */}
              <label htmlFor={task.task}>{task.task}</label>
          </div>
          <div>
            <button className='todo-btn' onClick={() =>handleEdit(task)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button  className='todo-btn' onClick={() =>handleDelete(task)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Todo;