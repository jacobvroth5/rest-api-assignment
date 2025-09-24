const express = require('express');
const { v4: uuidv4 } = require('uuid'); // ✅ import uuid for unique IDs
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// In-memory users array
let users = [];

/**
 * POST /users - Create a User
 */
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: require('uuid').v4(),
        name,
        email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

/**
 * GET /users/:id - Retrieve a User
 */
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

/**
 * PUT /users/:id - Update a User
 */
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex] = { id, name, email };
    res.json(users[userIndex]);
});

/**
 * DELETE /users/:id - Delete a User
 */
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// **************************************************************

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
