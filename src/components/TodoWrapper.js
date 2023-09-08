/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const [editTodoForm, setEditTodoForm] = useState(null);

  const [filterTodo, setFilterTodo] = useState("all");
  console.log(editTodoForm);
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: Math.floor(Math.random() * 1000), task: todo, completed: false },
    ]);
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEditTodo = (editTodo) => {
    const index = todos.findIndex((item) => item.id === editTodo.id);

    const updatedTodos = [...todos];

    updatedTodos[index] = editTodo;

    setTodos(updatedTodos);

    setEditTodoForm(null);
  };

  const handleDeleteToDo = (task) => {
    const updatedTodos = todos.filter((item) => item.id !== task.id);

    setTodos(updatedTodos);
  };

  const handleFilterClick = (filterType) => {
    setFilterTodo(filterType);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterTodo === "all") {
      return true;
    } else if (filterTodo === "completed") {
      return todo.completed;
    } else if (filterTodo === "uncompleted") {
      return !todo.completed;
    }
  });

  const handleCheckboxChange = (id) => {
    // Tìm todo có 'id' tương ứng trong danh sách 'todos'

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    // Cập nhật danh sách 'todos' với todo đã thay đổi trạng thái

    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h2>Todo List</h2>
      <TodoForm
        addTodo={addTodo}
        handleEditTodo={handleEditTodo}
        editTodoForm={editTodoForm}
      />
      {filteredTodos.map((task, index) => (
        <Todo
          task={task}
          key={index}
          id={task.id}
          EditTodo={() => setEditTodoForm(task)}
          DeleteTodo={handleDeleteToDo}
          onChange={handleCheckboxChange}
        />
      ))}
      <div className="filters">
        <div className="dropdown">
          <button className="dropbtn">Filters</button>
          <div className="dropdown-content">
            <a id="all" onClick={() => handleFilterClick("all")}>
              All
            </a>
            <a id="com" onClick={() => handleFilterClick("completed")}>
              Completed
            </a>
            <a id="rem" onClick={() => handleFilterClick("uncompleted")}>
              Uncompleted
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoWrapper;
