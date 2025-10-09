import nodemailer from "nodemailer";
// import Twilio from "twilio";

/**
 * Send Email
 */
export const sendEmail = async (to, subject, text, html = null) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS is not set in environment variables.");
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
    });

    const recipients = Array.isArray(to) ? to.join(", ") : to;

    const mailOptions = {
      from: `"Smart Blood Donation" <${process.env.EMAIL_USER}>`,
      to: recipients,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${recipients} → ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error: error.message };
  }
};

// /**
//  * Send SMS
//  */
// export const sendSMS = async (to, message, from = process.env.TWILIO_PHONE_NUMBER) => {
//   if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
//     throw new Error("Twilio credentials are not properly set in environment variables.");
//   }
//   if (!to || !message) throw new Error("Recipient number(s) and message are required.");

//   try {
//     const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
//     const recipients = Array.isArray(to) ? to : [to];

//     const invalidNumbers = recipients.filter(num => !/^\+\d{10,15}$/.test(num));
//     if (invalidNumbers.length > 0) {
//       throw new Error(`Invalid phone number(s): ${invalidNumbers.join(", ")}`);
//     }

//     const results = await Promise.all(
//       recipients.map(async (recipient) => {
//         try {
//           const msg = await client.messages.create({
//             body: message,
//             from,
//             to: recipient,
//           });
//           console.log(`📩 SMS sent to ${recipient}: SID ${msg.sid}`);
//           return { recipient, sid: msg.sid, status: "sent" };
//         } catch (err) {
//           console.error(`❌ Failed to send SMS to ${recipient}:`, err.message);
//           return { recipient, error: err.message, status: "failed" };
//         }
//       })
//     );

//     return { success: true, results };
//   } catch (error) {
//     console.error("❌ SMS sending failed:", error);
//     return { success: false, error: error.message };
//   }
// };

/**
 * Send both Email + SMS
 */
// export const sendNotification = async ({ emailTo, smsTo, subject, message, html = null }) => {
//   const results = {};
//   if (emailTo) results.email = await sendEmail(emailTo, subject, message, html);
//   if (smsTo) results.sms = await sendSMS(smsTo, message);
//   return results;
// };
export const sendNotification = async ({ emailTo, smsTo, subject, message, html = null }) => {
  const results = {};
  if (emailTo) results.email = await sendEmail(emailTo, subject, message, html);
  if (smsTo) results.sms = await sendSMS(smsTo, message);
  return results;
};
