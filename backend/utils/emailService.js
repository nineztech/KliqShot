import nodemailer from 'nodemailer';

/**
 * Send OTP email to user
 * @param {string} to - Recipient email address
 * @param {string} otp - OTP code
 * @param {string} name - User's name
 * @returns {Promise<boolean>}
 */
export const sendOtpEmail = async (to, otp, name) => {
  try {
    // Clean environment variables (remove quotes if present)
    const emailUser = (process.env.EMAIL_USER || process.env.SMTP_USER || '').replace(/^["']|["']$/g, '');
    const emailPassword = (process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD || '').replace(/^["']|["']$/g, '');
    const emailHost = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
    const emailPort = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587');
    const emailSecure = process.env.EMAIL_SECURE === 'true';
    
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });
    const mailOptions = {
      from: `"KliqShot" <${emailUser || 'noreply@kliqshot.com'}>`,
      to: to,
      subject: 'Email Verification - KliqShot',
      html: `
        <html>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">KliqShot</p>
          </div>
          
          <div style="margin-top: 30px;">
            <p>Hello ${name},</p>
            <p>Thank you for registering with KliqShot. To complete your registration, please use the verification code below:</p>
          </div>
          
          <div style="text-align: right; margin: 30px 0;">
            <p style="text-align: right; font-size: 36px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace; margin: 0;">${otp}</p>
          </div>
          
          <div>
            <p>This code is valid for 10 minutes only.</p>
            <p>Enter this code on the registration page to complete your account setup.</p>
            <p><strong>Security Notice:</strong> Never share this code with anyone.</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666;">
            <p>This is an automated email. Please do not reply.</p>
            <p>&copy; ${new Date().getFullYear()} KliqShot. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    // Check if email credentials are configured
    if (!emailUser || !emailPassword) {
      console.log('═══════════════════════════════════════════');
      console.log(`📧 OTP Email for ${to}`);
      console.log(`   Name: ${name}`);
      console.log(`   OTP: ${otp}`);
      console.log('═══════════════════════════════════════════');
      console.log('⚠️  Email credentials not configured. Set EMAIL_USER and EMAIL_PASSWORD in .env');
      return true;
    }

    console.log('📤 Attempting to send email...');
    console.log(`   From: ${emailUser}`);
    console.log(`   To: ${to}`);
    console.log(`   Host: ${emailHost}:${emailPort}`);
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error.message);
    console.error('Full error:', error);
    
    // In case of error, still log the OTP
    console.log('═══════════════════════════════════════════');
    console.log(`📧 OTP Email for ${to}`);
    console.log(`   Name: ${name}`);
    console.log(`   OTP: ${otp}`);
    console.log('═══════════════════════════════════════════');
    
    return false;
  }
};

/**
 * Generate a random 6-digit OTP
 * @returns {string}
 */
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Get OTP expiry time (10 minutes from now)
 * @returns {Date}
 */
export const getOtpExpiry = () => {
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 10);
  return expiryTime;
};

