import nodemailer from "nodemailer"

export const sendEmail = async (email:string, url:string) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"SearchAThon" <noreply@searchathon.com>',
    to: email,
    subject: "Verify your SearchAThon Account",
    html: `
      <div style="font-family: sans-serif; text-align: center;">
        <h2>Verify your Email</h2>
        <p>Click the button below to complete your registration for SearchAThon.</p>
        <a href="${url}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; rounded: 5px; display: inline-block;">
          Verify Email address
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          If the button doesn't work, copy and paste this link: <br> ${url}
        </p>
      </div>
    `,
  });
};