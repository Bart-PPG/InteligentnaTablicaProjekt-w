import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
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
