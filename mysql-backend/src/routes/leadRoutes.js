import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { Lead } from "../modules/Lead.js";
import { parseTrackingUrl } from "../utils/parseTrackingUrl.js";

export const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, industry, message, lpurl, formID } = req.body;

    if (!name || !email || !phone || !industry) {
      return res.status(400).json("please enter something");
    }

    const trackingData = parseTrackingUrl(lpurl);

    await Lead.create({
      name,
      email,
      phone,
      industry,
      message,
      lpurl,
      formID,
      ...trackingData,
    });

    return res.status(200).json("user created");
  } catch (error) {
    console.error(error);
    return res.status(500).json("server error");
  }
});

router.get("/", auth, async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

router.delete("/:id", auth, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json("lead deleted successful");
});

router.post("/bulk-delete", auth, async (req, res) => {
  const { ids } = req.body;
  await Lead.deleteMany(ids);
  res.json("Leads deleted successfully");
});
