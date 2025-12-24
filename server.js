// server.js - Simple backend for testing
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/static', express.static('static'));
app.use('/templates', express.static('templates'));

// Temporary in-memory user store for testing
const demoUsers = [
    {
        email: 'katawut.paramee@gmail.com',
        password: 'abcd1234',
        id: 1,
        user_id: 'user_001',
        name: 'Katawut Paramee'
    },
    {
        email: 'test@example.com',
        password: 'password123',
        id: 2,
        user_id: 'user_002',
        name: 'Test User'
    }
];

// Login API endpoint
app.post('/api/auth/login', (req, res) => {
    console.log('Login attempt:', req.body);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }
    
    // Find user
    const user = demoUsers.find(u => u.email === email || u.user_id === email);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not found'
        });
    }
    
    // Check password (simple comparison for demo)
    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid password'
        });
    }
    
    // Successful login
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
        success: true,
        token: 'demo_jwt_token_' + Date.now(),
        user: userWithoutPassword,
        message: 'Login successful (demo mode)'
    });
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/templates/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'templates', page));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`✅ Login API: http://localhost:${PORT}/api/auth/login`);
    console.log(`✅ Test with: email=katawut.paramee@gmail.com, password=abcd1234`);
});