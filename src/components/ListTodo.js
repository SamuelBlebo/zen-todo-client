import { React, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import InputTodo from "./InputTodo";

export default function ListTodo() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(
        `https://zen-todo-server.vercel.app/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = (id, newDescription) => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === id ? { ...todo, description: newDescription } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const getTodos = async () => {
    try {
      const response = await fetch("https://zen-todo-server.vercel.app/todos", {
        method: "GET",
      });
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleTodoAdded = () => {
    // When a new todo is added, we can simply fetch the updated list of todos
    getTodos();
  };

  return (
    <div className="overflow-x-auto no-scrollbar h-[450px] lg:h-[600px] relative">
      <InputTodo onTodoAdded={handleTodoAdded} />
      <table className="table mt-5">
        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo.todo_id}
              className="flex items-center justify-center mb-2 lg:mb-4"
            >
              <td className="w-[200px] lg:w-[280px] xl:w-[400px] bg-green-300 h-[40px] lg:h-[50px] flex items-center rounded-l-lg px-[25px]">
                {editingTodo === todo.todo_id ? (
                  <EditTodo todo={todo} onUpdate={updateTodo} />
                ) : (
                  todo.description
                )}
              </td>
              <td className="bg-[#000] text-[#fff] h-[40px] lg:h-[50px] w-[30px] flex items-center justify-center">
                {editingTodo === todo.todo_id ? null : (
                  <BiSolidEditAlt onClick={() => setEditingTodo(todo.todo_id)} />
                )}
              </td>
              <td className="bg-[#000] text-green-300 w-[35px] h-[40px] lg:h-[50px] flex items-center justify-center rounded-r-lg">
                <BsCheckCircleFill onClick={() => deleteTodo(todo.todo_id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
