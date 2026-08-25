const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register → POST /users/register
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    await User.create({
      email,
      password: hashedPassword
    });

    // ✅ Exact response from screenshot
    return res.status(201).json({ message: "Registered Successfully" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Login → POST /users/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Sign token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Exact response from screenshot
    return res.status(200).json({ access: token });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Get Details → GET /users/details
const getDetails = async (req, res) => {
  try {
    // ✅ Exact shape from screenshot: _id, email, isAdmin, __v
    return res.status(200).json({ user: req.user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getDetails };