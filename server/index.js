const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Hardcoded todo list
const todos = [
  {
    id: '1',
    text: 'Complete project documentation',
    completed: false
  },
  {
    id: '2',
    text: 'Review pull requests',
    completed: true
  },
  {
    id: '3',
    text: 'Update dependencies',
    completed: false
  },
  {
    id: '4',
    text: 'Write unit tests',
    completed: false
  },
  {
    id: '5',
    text: 'Deploy to production',
    completed: false
  }
];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json({
    success: true,
    data: todos
  });
});

// Get a single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    });
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on:`);
  console.log(`  - Local: http://localhost:${PORT}`);
  console.log(`  - Network: http://10.0.0.203:${PORT}`);
  console.log(`Try accessing: http://10.0.0.203:${PORT}/api/todos`);
});