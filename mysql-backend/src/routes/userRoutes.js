import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { User } from "../modules/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/db.js";

export const router = Router();

router.post("/signup", auth, async (req, res) => {
  try {
    const { name, email, phone, password, role, roleAssignedBy } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashPassword,
      role: role || "user",
      roleAssignedBy,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json("Failed to create user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    const status = await bcrypt.compare(password, user.password);
    if (!status) return res.status(400).json("Wrong password");

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ id: user._id, token: jwtToken });
  } catch {
    res.status(500).json("Login failed");
  }
});

router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json("User not found");
  res.json(user);
});

router.patch("/:id/role", auth, async (req, res) => {
  const { role } = req.body;
  if (!["admin", "user", "owner"].includes(role))
    return res.status(400).json("Invalid role");

  await db.query("UPDATE users SET role=? WHERE _id=?", [role, req.params.id]);
  const user = await User.findById(req.params.id);
  res.json({ message: "Role updated", user });
});

router.delete("/:id", auth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User deleted successfully");
});

router.post("/verify", (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.KEY);
    res.json({ authorized: true, user: decoded });
  } catch {
    res.status(401).json({ authorized: false });
  }
});

router.patch("/:id/password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json("User not found");

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) return res.status(400).json("Current password is incorrect");

  const hashed = await bcrypt.hash(newPassword, 10);
  await db.query("UPDATE users SET password=? WHERE _id=?", [hashed, user._id]);

  res.json("Password updated successfully");
});

router.patch("/:id/reset-password", auth, async (req, res) => {
  if (req.user.role !== "owner")
    return res.status(403).json("Only owner can reset passwords");

  const hashed = await bcrypt.hash(req.body.newPassword, 10);
  await db.query("UPDATE users SET password=? WHERE _id=?", [
    hashed,
    req.params.id,
  ]);

  res.json("Password reset successfully");
});

router.patch("/:id/profile", auth, async (req, res) => {
  const { name, email, phone } = req.body;

  const [existing] = await db.query(
    "SELECT _id FROM users WHERE email=? AND _id!=?",
    [email, req.params.id]
  );
  if (existing.length) return res.status(400).json("Email already in use");

  await db.query("UPDATE users SET name=?, email=?, phone=? WHERE _id=?", [
    name,
    email,
    phone,
    req.params.id,
  ]);

  const user = await User.findById(req.params.id);
  res.json({ message: "Profile updated successfully", user });
});
