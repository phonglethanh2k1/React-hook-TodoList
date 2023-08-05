import React, { useState, useEffect, useRef } from "react";

const TodoForm = ({ addTodo, EditTodo, editTodo }) => {

  const [value, setValue] = useState("");

  const ref = useRef(null);


  useEffect(() => {

    if (editTodo) {

      setValue(editTodo.task);

    }
    else {

      setValue("");

    }

  }, [editTodo]);

  const handleInputChange = (e) => {

    setValue(e.target.value);

  };

  const handleSubmit = () => {

    if (editTodo) {

      
      const updatedTodo = { ...editTodo, task: value };

      EditTodo(updatedTodo);

      ref.current.focus();
    }
    else {

      addTodo(value);

      setValue(""); 
      
      ref.current.focus();
    }
  };

  return (
    <div className="row">
    <div>
      <input
        type='text'
        className='add-task'
        placeholder='Add your ToDo'
        value={value}
        onChange={handleInputChange}
        ref={ref}
      />
      
      </div>
      <button id="btn" onClick={() => handleSubmit()}>
        {editTodo ? "Update" : "Add"} 
      </button>
    </div>
  );
};

export default TodoForm;