import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, updateTask } from '../redux/todoSlice';
import './TaskList.css'; 

const TaskList = () => {
  const tasks = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleUpdateClick = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const handleSave = (id) => {
    dispatch(updateTask({ id, text: editText }));
    setEditId(null);
    setEditText('');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <button onClick={() => handleSave(task.id)} className="save-btn">Save</button>
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <>
              <span>{task.text}</span>
              <div className="task-actions">
                <button onClick={() => handleUpdateClick(task)} className="update-btn">Update</button>
                <button onClick={() => dispatch(removeTask(task.id))} className="delete-btn">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
