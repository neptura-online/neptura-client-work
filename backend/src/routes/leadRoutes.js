import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { Lead } from "../modules/Lead.js";
import { parseTrackingUrl } from "../utils/parseTrackingUrl.js";
import { addLeadToSheet } from "../utils/googleSheet.js";
//import { sendAdminLeadMail, sendLeadMail } from "../utils/sendMail.js";

export const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, industry, message, lpurl, formID } = req.body;

    if (!name || !email || !phone || !industry) {
      return res.status(400).json("please enter something");
    }

    const trackingData = parseTrackingUrl(lpurl);

    const lead = await Lead.create({
      name,
      email,
      phone,
      industry,
      message,
      lpurl,
      formID,
      ...trackingData,
    });

    try {
      await Promise.all([
        addLeadToSheet(lead),
        //sendLeadMail({ name, email }),
        // sendAdminLeadMail(lead),
      ]);
    } catch (err) {
      console.error("Reporting failed:", err);
    }

    return res.status(200).json("user created");
  } catch (error) {
    console.error(error);
    return res.status(500).json("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    await Lead.findByIdAndDelete({ _id: id });
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

    await Lead.deleteMany({ _id: { $in: ids } });

    return res.status(200).json("Leads deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
