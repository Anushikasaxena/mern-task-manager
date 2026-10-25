const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// 3. Forgot Password Controller
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes validity
        await user.save();

        // Configure Nodemailer transporter using Render Environment Variables
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetUrl = `${process.env.CLIENT_URL || 'https://mern-task-manager-1-1wl8.onrender.com'}/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request - Task Manager',
            html: `
        <h3>Password Reset Request</h3>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>This link will expire in 15 minutes.</p>
      `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Forgot password link sent successfully" });
    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};