import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => setNewTask(e.target.value);

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    if (tasks.length === 0) {
      alert("No tasks to clear.");
      return;
    }
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
    }
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  const saveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <h1>Task Manager</h1>
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Logout
        </button>
      </nav>

      <div style={styles.content}>
        {/* Task Input Section */}
        <div style={styles.taskInputContainer}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button
            onClick={addTask}
            style={styles.addButton}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Add Task
          </button>
          <button
            onClick={clearAllTasks}
            style={styles.clearButton}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Clear All
          </button>
        </div>

        {/* Task List */}
        <div style={styles.taskList}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} style={styles.task}>
                {editingTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                      style={styles.editInput}
                    />
                    <div style={styles.buttonGroup}>
                      <button onClick={() => saveEdit(task.id)} style={styles.saveButton}>
                        ✅ Save
                      </button>
                      <button onClick={cancelEditing} style={styles.cancelButton}>
                        ❌ Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <div style={styles.buttonGroup}>
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        style={styles.editButton}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        style={styles.deleteButton}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No tasks available. Add some!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,rgb(235, 146, 116),rgb(232, 133, 12))",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    transition: "background 0.5s ease-in-out",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#2c3e50",
    color: "#fff",
  },
  logoutButton: {
    background: "linear-gradient(135deg, #ff4d4d, #d32f2f)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    padding: "10px 20px",
    transition: "all 0.3s",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    flex: 1,
  },
  taskInputContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "800px",
  },
  input: {
    flex: "1",
    minWidth: "200px",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  addButton: {
    padding: "12px 20px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  clearButton: {
    padding: "12px 20px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "90%",
    maxWidth: "800px",
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
};

export default Home;
