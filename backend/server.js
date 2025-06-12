const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: 'your-app-password'     // Replace with your app password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { fullName, email, phone, service, message } = req.body;

        // Send email
        await transporter.sendMail({
            from: 'your-email@gmail.com', // Replace with your Gmail
            to: 'your-email@gmail.com',   // Replace with your Gmail
            subject: `New Contact Form Submission from ${fullName}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><b>Name:</b> ${fullName}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone || 'Not provided'}</p>
                <p><b>Service:</b> ${service}</p>
                <p><b>Message:</b> ${message}</p>
            `
        });

        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 