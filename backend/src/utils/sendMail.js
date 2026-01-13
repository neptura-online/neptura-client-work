import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendLeadMail = async ({ name, email }) => {
  return transporter.sendMail({
    from: `"e-Marketing" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for contacting us!",
    html: `
      <h2>Hello ${name},</h2>
      <p>Thanks for reaching out to us.</p>
      <p>Our team will contact you shortly.</p>
      <br/>
      <p>Regards,<br/>e-Marketing Team</p>
    `,
  });
};
