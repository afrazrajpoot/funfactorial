const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs").promises;


// Create a transporter object with OAuth2 configuration
async function createTransporter() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: "465", // usually 587 for TLS or 465 for SSL
      secure: true, // true for 465, false for other ports
      auth: {
        user: "info@funrides.co.uk", // your Hostinger email address
        pass: "Muzamil1234+", // your Hostinger email password
      },
    });
    
    
    // Verify transporter configuration
    await transporter.verify();
    return transporter;
  } catch (error) {
    console.error('Error creating transporter:', error);
    throw error;
  }
}

// Send email function using EJS template
async function sendEmail(to, subject, templateData) {
  // Input validation
  if (!to || typeof to !== 'string' || !to.includes('@')) {
    throw new Error('Invalid recipient email address');
  }
  
  if (!subject) {
    throw new Error('Email subject is required');
  }
  
  if (!templateData || typeof templateData !== 'object') {
    throw new Error('Template data must be provided as an object');
  }

  try {
    const transporter = await createTransporter();
    
    // Read and render the EJS template using promises
    const templatePath = path.join(__dirname, "../views/mail.ejs");
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const renderedHtml = await ejs.render(templateContent, templateData);
    const mailOptions = {
      from: {
        name: 'Funride',
        address: 'info@funrides.co.uk'
      },
      to: to.trim(), 
      subject: subject,
      text: `Hello, your booking has been confirmed!`,
      html: renderedHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error for proper handling by the caller
  }
}

module.exports = sendEmail;
