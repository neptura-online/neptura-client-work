import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { TrackingField } from "../modules/TrackingField.js";

export const router = Router();

router.get("/", auth, async (req, res) => {
  const fields = await TrackingField.find();
  res.json(fields);
});

router.post("/", auth, async (req, res) => {
  const field = await TrackingField.create({
    key: req.body.key,
  });

  res.json(field);
});

router.patch("/toggle/:id", auth, async (req, res) => {
  await TrackingField.toggle(req.params.id, req.body.isActive);

  res.json({ success: true });
});

router.delete("/:id", auth, async (req, res) => {
  await TrackingField.delete(req.params.id);
  res.json({ success: true });
});
