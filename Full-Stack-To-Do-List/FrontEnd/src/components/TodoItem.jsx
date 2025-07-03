// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function TodoItem({ taskid, content }) {
//   const [edit,setEdit]=useState(false);
//   const [dataContent,setDataContent]= useState([]);
//   function handleDelete() {
//     axios
//       .delete(`http://localhost:2500/api/deleteItem/id/${taskid}`)
//       .then(() => {})
//       .catch((error) => {
//         console.error("Deleting error ...", error);
//       });
//   }

//   // axios
//   //   .patch(`http://localhost:2500/api/editList/id/${taskid}`, {
//   //     content: newContent
//   //   })
//   //   .then((res) => {
//   //     console.log(res.data);
//   //   })
//   //   .catch((err) => {
//   //     console.error("Editing error:", err);
//   //   });
//   function handleEdit() {
//     axios
//       .get(`http://localhost:2500/api/findItem/id/${taskid}`)
//       .then((response) => {
//         // console.log(response.data.content)
//         // const data = response.data.content;
//         // console.log(data);
//         // setEdit(response.data.content)
//         // localStorage.setItem("content", edit);
//         // const x = localStorage.getItem("content");
//         // console.log(x);
//         const data=response.data.content;
//         console.log(data)
//         setDataContent(data)
//         setEdit(true);
//         console.log(edit);
//       })
//       .catch((error) => {
//         console.error("Couldnt Get The Content ...", error);
//       });
//   }

//   useEffect(() => {
//     handleDelete;
//     handleEdit;
//   });

//   return (
//     <li className="flex items-start justify-between py-4">
//       <div className="flex items-start">
//         <input type="checkbox" className="mt-1 mr-4 text-lg accent-gray-500" />

//         <div>
//           <p className="text-sm text-gray-600 mt-1">{content}</p>
//          {edit===true ? <input type="text" placeholder="Edit Your task…" className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-gray-500 cursor-pointer focus:outline-none"/>:"" }
//         </div>
//       </div>

//       <div className="flex space-x-2">
//         <button
//           aria-label="Edit task"
//           className="text-blue-500 hover:text-blue-700 text-sm font-medium"
//           onClick={handleEdit}
//         >
//           Edit
//         </button>
//         <button
//           aria-label="Delete task"
//           className="text-red-400 hover:text-red-600 text-sm font-medium"
//           onClick={handleDelete}
//         >
//           ✕
//         </button>
//       </div>
//     </li>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function TodoItem({ taskid, content }) {
  const [edit, setEdit] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const [finished, setFinished] = useState(false);

  function handleDelete() {
    axios
      .delete(`http://localhost:2500/api/deleteItem/id/${taskid}`)
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.error("Deleting error ...", error);
      });
  }

  function handleEdit() {
    axios
      .get(`http://localhost:2500/api/findItem/id/${taskid}`)
      .then((response) => {
        const data = response.data.content;
        setUpdatedContent(data);
        setEdit(true);
      })
      .catch((error) => {
        console.error("Couldn't Get The Content ...", error);
      });
  }

  function handleSave() {
    axios
      .patch(`http://localhost:2500/api/editList/id/${taskid}`, {
        content: updatedContent,
      })
      .then((res) => {
        console.log("Updated:", res.data);
        setEdit(false);
      })
      .catch((err) => {
        console.error("Editing error:", err);
      });
  }

  const handleChecked = async (e) => {
    const isChecked = e.target.checked;
    setFinished(isChecked);

    try {
      await axios.patch(`http://localhost:2500/api/editList/id/${taskid}`, {
        finished: isChecked,
      });
    } catch (err) {
      console.error("Failed to update:", err);
      setFinished(!isChecked);
    }
  };

  return (
    <li className="flex items-start justify-between py-4">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={finished}
          onChange={handleChecked}
          className="mt-1 mr-4"
        />

        <div>
          {edit ? (
            <>
              <input
                type="text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-gray-500"
              />
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-700 text-sm font-medium ml-2"
              >
                Save
              </button>
            </>
          ) : (
            <p
              className={`text-sm mt-1 ${
                finished ? "text-green-600 line-through" : "text-gray-600"
              }`}
            >
              {content}
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          aria-label="Edit task"
          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          aria-label="Delete task"
          className="text-red-400 hover:text-red-600 text-sm font-medium"
          onClick={handleDelete}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
