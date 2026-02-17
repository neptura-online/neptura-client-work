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

router.patch("/sheet-toggle/:formID", auth, async (req, res) => {
  try {
    const { isActive } = req.body;

    const mapping = await SheetMapping.findOneAndUpdate(
      { formID: req.params.formID },
      { isActive },
      { new: true }
    );

    res.json(mapping);
  } catch (err) {
    res.status(500).json("Toggle failed");
  }
});
