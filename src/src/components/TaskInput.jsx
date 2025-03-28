import React, { useState } from "react";

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "10px", flex: "1" }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
