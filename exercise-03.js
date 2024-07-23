// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data.json');

const getData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const saveData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all users
app.get('/users', (req, res) => {
  const data = getData();
  res.json(data.users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const data = getData();
  const user = data.users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).send('User not found');
});

// Create new user
app.post('/users', (req, res) => {
  const data = getData();
  const newUser = { ...req.body, id: Date.now() };
  data.users.push(newUser);
  saveData(data);
  res.status(201).json(newUser);
});

// Update user by ID
app.put('/users/:id', (req, res) => {
  const data = getData();
  const index = data.users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    data.users[index] = { ...data.users[index], ...req.body };
    saveData(data);
    res.json(data.users[index]);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
  const data = getData();
  const newUsers = data.users.filter(u => u.id !== parseInt(req.params.id));
  if (newUsers.length !== data.users.length) {
    data.users = newUsers;
    saveData(data);
    res.sendStatus(204);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
