const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure to create a User model

// Sign up route
router.post('/signup', async (req, res) => {
    const { username, email, password, age, accountNumber, ifscCode } = req.body;

    // Validate request
    if (!username || !email || !password || !age || !accountNumber || !ifscCode) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Check if user or account already exists
        const existingUser = await User.findOne({ email });
        const existingAccount = await User.findOne({ accountNumber });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        if (existingAccount) {
            return res.status(400).json({ message: 'This account number is already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            age,
            accountNumber,
            ifscCode,
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, 'jwtSecret', { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
