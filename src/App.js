import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button, Form, ListGroup } from 'react-bootstrap'; // Import React Bootstrap components
import './App.css'; // Import custom CSS

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { description: newTask, time: new Date().getTime(), completed: false }]);
      setNewTask('');
    }
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Itinerary Planner</h1>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={addTask}>
          Add Task
        </Button>
      </Form>
      <hr />
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <ListGroup>
        {filteredTasks.map((task, index) => (
          <ListGroup.Item key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="d-flex justify-content-between align-items-center">
              <div>{task.description}</div>
              <div>
                <Button variant="success" size="sm" onClick={() => toggleCompleted(index)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </Button>
                <Button variant="info" size="sm" className="mx-2" onClick={() => updateTask(index, task)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => deleteTask(index)}>
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
