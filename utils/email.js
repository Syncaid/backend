import nodemailer from 'nodemailer'

const sendEmail = async (email, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
,
      },
    
    }
    );
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
      
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export default sendEmail;