import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { Lead } from "../modules/Lead.js";
import { addToGoogleSheet } from "../utils/googleSheet.js";
import { sendLeadMail } from "../utils/sendMail.js";

export const router = Router();

router.post("/", async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      industry,
      message,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid,
      gclid,
      lpurl,
      formID,
    } = req.body;

    if (!name || !email || !phone || !industry) {
      return res.status(400).json("please enter something");
    }

    const findEmail = await Lead.findOne({ email });
    if (findEmail) {
      return res.status(409).json("email already exist");
    }
    const findPhone = await Lead.findOne({ phone });
    if (findPhone) {
      return res.status(409).json("phone number already exist");
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      industry,
      message,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid,
      gclid,
      lpurl,
      formID,
    });

    await addToGoogleSheet(lead);
    sendLeadMail({ name, email }).catch(console.error);

    return res.status(200).json("user created");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
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
    const lead = await Lead.findByIdAndDelete({ _id: id });
    res.status(200).json("lead deleted successful");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
