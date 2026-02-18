import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { SheetMapping } from "../modules/SheetMapping.js";

export const router = Router();

router.post("/sheet-mapping", auth, async (req, res) => {
  try {
    const mapping = await SheetMapping.create(req.body);
    res.json(mapping);
  } catch (err) {
    res.status(500).json("Error creating mapping");
  }
});

router.put("/sheet-mapping/:id", auth, async (req, res) => {
  try {
    const { formID, page, spreadsheetId, sheetName, isActive, fields } =
      req.body;

    const updated = await SheetMapping.findByIdAndUpdate(
      req.params.id,
      {
        formID: formID || null,
        page: page || null,
        spreadsheetId,
        sheetName,
        isActive,
        fields,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json("Update failed");
  }
});

router.get("/sheet-mappings", auth, async (req, res) => {
  try {
    const mappings = await SheetMapping.find().sort({ createdAt: -1 });
    res.json(mappings);
  } catch (err) {
    res.status(500).json("Failed to fetch mappings");
  }
});

router.patch("/sheet-toggle/:id", auth, async (req, res) => {
  try {
    const mapping = await SheetMapping.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );

    res.json(mapping);
  } catch (err) {
    res.status(500).json("Toggle failed");
  }
});

router.delete("/sheet-mapping/:id", auth, async (req, res) => {
  try {
    await SheetMapping.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json("Delete failed");
  }
});
