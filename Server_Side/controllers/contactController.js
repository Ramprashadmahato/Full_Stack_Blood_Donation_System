import Contact from "../models/Contact.js";

// Submit Contact Form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    // Save to DB
    const contact = await Contact.create({ name, email, subject, message });

    // Optional: Send email (using nodemailer)
    // await sendEmail({ to: "team@example.com", subject, text: message });

    res.status(200).json({ message: "Message received successfully!", contact });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
