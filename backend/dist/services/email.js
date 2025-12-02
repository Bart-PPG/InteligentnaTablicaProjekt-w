import nodemailer from "nodemailer";
export const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "YOUR_EMAIL@gmail.com",
            pass: "APP_PASSWORD"
        }
    });
    await transporter.sendMail({
        from: "Task Manager",
        to,
        subject,
        text
    });
};
