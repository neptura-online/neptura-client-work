import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { User } from "../modules/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const router = Router();

router.post("/signup", auth, async (req, res) => {
  try {
    const { name, email, phone, password, role, roleAssignedBy } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashPassword,
      role: role || "user",
      roleAssignedBy,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to create user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    const status = await bcrypt.compare(password, user.password);
    const key = process.env.KEY;
    const jwtToken = jwt.sign({ email: user.email }, key, { expiresIn: "24h" });
    if (!status) {
      return res.status(400).json("Wrong password");
    }
    res.status(200).json({ id: user._id, token: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json("Login failed");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to fetch users");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to fetch user");
  }
});

router.patch("/:id/role", auth, async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json("Invalid role");
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) return res.status(404).json("User not found");

    res.status(200).json({
      message: "Role updated",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to update role");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json("User not found");

    res.status(200).json("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to delete user");
  }
});

router.post("/verify", (req, res) => {
  try {
    const token = req.headers.token;
    const key = process.env.KEY;

    const decoded = jwt.verify(token, key);

    return res.status(200).json({
      authorized: true,
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      authorized: false,
      message: "Invalid or expired token",
    });
  }
});

router.patch("/:id/password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json("All fields are required");
    }

    if (currentPassword === newPassword) {
      return res.status(400).json("New password must be different");
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json("Password updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to update password");
  }
});
