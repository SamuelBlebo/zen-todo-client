import React, { useState } from "react";

export default function EditTodo({ todo, onUpdate }) {
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description }),
        }
      );

      if (response.ok) {
        onUpdate(todo.todo_id, description);
      } else {
        console.error("Failed to update todo");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
