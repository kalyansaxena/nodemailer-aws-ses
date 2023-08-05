const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const AWS = require("@aws-sdk/client-ses");

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_SES_REGION } = process.env;

// Create SES service object.
const ses = new AWS.SES({
  apiVersion: "2010-12-01",
  region: AWS_SES_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// Create an SES transporter using Nodemailer
const transporter = nodemailer.createTransport({
  SES: { ses, aws: AWS },
});

const sendEmail = async () => {
  try {
    // Email content
    const mailOptions = {
      from: {
        name: 'Web Wizard',
        address: 'webwizard0808@gmail.com'
      }, // sender address
      to: ["webwizard0808@gmail.com"], // list of receivers
      subject: 'Test Email with Attachments', // Subject line
      text: 'Hello, this is a test email with attachments!', // plain text body
      html: "<b>Hello, this is a test email with attachments!</b>", // html body
      attachments: [
        {
          filename: 'test.pdf',
          path: path.join(__dirname, 'test.pdf'),
          contentType: 'application/pdf'
        },
        {
          filename: 'sample.jpg',
          path: path.join(__dirname, 'sample.jpg'),
          contentType: 'image/jpg'
        },
      ]
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error(error);
  }
}

// Call the sendEmail function to send the email
sendEmail();