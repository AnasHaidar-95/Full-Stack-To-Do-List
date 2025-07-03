import React, { useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem.jsx"
import { useEffect } from "react";

export default function TodoList() {
  const [list, setList] = useState([]);
  const [change, setChange] = useState("");
  function handleAdd() {
    axios
      .post(`http://localhost:2500/api/addNewList`, {
        content: change,
      })
      .then(() => {})
      .catch((error) => {
        console.error("Adding error:", error);
      });
  }
  useEffect(() => {
    handleAdd;
  });

  useEffect(() => {
    axios
      .get("http://localhost:2500/api/showAllItems")
      .then((response) => {
        const data = response.data;
        setList(data);
      })
      .catch((error) => {
        console.error("Adding error:", error);
      });
  });


//    useEffect(() => {
//   const storedContent = localStorage.getItem("content");
//   if (storedContent) {
//     setEdit(storedContent);
//     console.log(storedContent)
//   }
// },[]);


  return (
    <div>
      <div className="flex mb-4">
        <input
          id="taskInputID"
          type="text"
          placeholder="Add a new task…"
          value={change}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-gray-500 cursor-pointer focus:outline-none"
          onChange={(e) => setChange(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="px-4 bg-gray-300 text-gray-500 rounded-r-lg cursor-pointer"
        >
          Add
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {list.map((task) => (
          <TodoItem key={task._id} taskid={task._id} content={task.content} />
        ))}
      </ul>
    </div>
  );
}
