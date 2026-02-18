import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { SheetMapping } from "../modules/SheetMapping.js";

export const router = Router();

router.post("/sheet-mapping", auth, async (req, res) => {
  try {
    const mapping = await SheetMapping.create(req.body);
    res.json(mapping);
  } catch (err) {
    res.status(500).json("Create failed");
  }
});

router.get("/sheet-mappings", auth, async (req, res) => {
  const mappings = await SheetMapping.find();
  res.json(mappings);
});

router.put("/sheet-mapping/:id", auth, async (req, res) => {
  await SheetMapping.update(req.params.id, req.body);
  res.json({ success: true });
});

router.patch("/sheet-toggle/:id", auth, async (req, res) => {
  await SheetMapping.toggle(req.params.id, req.body.isActive);
  res.json({ success: true });
});

router.delete("/sheet-mapping/:id", auth, async (req, res) => {
  await SheetMapping.delete(req.params.id);
  res.json({ success: true });
});
