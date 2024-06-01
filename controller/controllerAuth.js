const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { v4: uuidv4 } = require("uuid");

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

// Endpoint api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already in use",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "error",
        message: "Password must contain at least 8 characters, 1 uppercase, 1 number, and 1 special character",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate UUID
    const userId = uuidv4();

    // Create user
    await User.create(userId, name, email, hashedPassword);

    // Create JWT token
    const token = jwt.sign({ id: userId }, "test123", { expiresIn: "1h" });

    res.status(201).json({
      status: "success",
      message: "Anda berhasil register",
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

// Endpoint api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Update loginAt
    await User.updateLoginAt(user.id);

    // Create JWT token
    const token = jwt.sign({ id: user.id }, "test123", { expiresIn: "1h" });

    res.status(200).json({
      status: "success",
      message: "Anda berhasil login",
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verifikasi token refresh
    jwt.verify(refreshToken, "refreshSecret", async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate new access token
      const newAccessToken = jwt.sign({ id: decoded.id }, "accessSecret", { expiresIn: "1h" });

      // Send the new access token
      res.status(200).json({ token: newAccessToken });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Endpoint api/auth/logout
const logout = async (req, res) => {
  try {
    const userId = req.user.id;

    res.clearCookie("token");

    // Berikan respons setelah berhasil logout
    res.status(200).json({
      status: "success",
      message: "Anda berhasil logout",
      userId: userId,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = { register, login, logout, refreshToken };
