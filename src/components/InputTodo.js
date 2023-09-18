import { React, useState } from "react";

export default function InputTodo({ onTodoAdded }) {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (description.trim() === "") {
      return;
    }
    try {
      const body = { description };
      const response = await fetch("https://zen-todo-server.vercel.app/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Clear the form fields
        setDescription("");
        console.log("Posted");
        // Call the callback function to notify the parent component about the new todo
        onTodoAdded();
      } else {
        // Handle errors and provide user feedback
        console.error("Failed to post task");
        // You can display an error message to the user here
      }
    } catch (err) {
      console.error(err.message);
      // Handle network errors and provide user feedback
      // You can display an error message to the user here
    }
  };

  return (
    <div className="">
      <h1 className="font-bold text-[24px] mb-[10px] ml-1 sticky top-0 ">Zen Task</h1>
      <form onSubmit={onSubmitForm} className="flex sticky top-0">
        <input
          type="text"
          placeholder="Type your task here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-[200px] lg:w-[280px] xl:w-[400px] h-[45px] lg:h-[50px] px-[30px] rounded-l-lg"
        />
        <button
          className="bg-black h-[45px] lg:h-[50px] w-[50px] lg:w-[70px] text-[#fff] text-[25px] rounded-r-lg flex justify-center items-center"
          type="submit"
        >
          +
        </button>
      </form>
    </div>
  );
}
