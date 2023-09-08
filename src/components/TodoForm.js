import React, { useState, useEffect, useRef } from "react";

const TodoForm = ({ addTodo, handleEditTodo, editTodoForm }) => {
  const [value, setValue] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    if (editTodoForm) {
      setValue(editTodoForm.task);
    } else {
      setValue("");
    }
  }, [editTodoForm]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (editTodoForm) {
      const updatedTodo = { ...editTodoForm, task: value };

      handleEditTodo(updatedTodo);

      ref.current.focus();
    } else {
      addTodo(value);

      setValue("");

      ref.current.focus();
    }
  };

  return (
    <div className="row">
      <div>
        <input
          type="text"
          className="add-task"
          placeholder="Add your ToDo"
          value={value}
          onChange={handleInputChange}
          ref={ref}
        />
      </div>
      <button id="btn" onClick={() => handleSubmit()}>
        {editTodoForm ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default TodoForm;
