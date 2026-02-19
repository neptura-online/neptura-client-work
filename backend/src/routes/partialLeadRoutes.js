import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { PartialLead } from "../modules/Partial.js";
import { parseTrackingUrl } from "../utils/parseTrackingUrl.js";

export const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, industry, message, lpurl, formID } = req.body;

    const trackingData = await parseTrackingUrl(lpurl);

    await PartialLead.create({
      name,
      email,
      phone,
      industry,
      message,
      lpurl,
      formID,
      tracking: trackingData,
    });

    return res.status(200).json("user created");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const leads = await PartialLead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    await PartialLead.findByIdAndDelete({ _id: id });
    res.status(200).json("lead deleted successful");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.post("/bulk-delete", auth, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json("No leads selected");
    }

    await PartialLead.deleteMany({ _id: { $in: ids } });

    return res.status(200).json("Leads deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
