

const generateOtp=()=>{

    return Math.floor(100000 + Math.random() * 900000).toString();
}

const generateEmailHtml=(otp)=>{

    return `
<div style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif; color: #333333;">
    <div style="max-width: 600px; margin: 40px auto; padding: 0 20px;">
        
        <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 28px; color: #1f2937;">
                    OTP Verification
                </h1>
            </div>

            <!-- Title -->
            <h2 style="margin: 0 0 15px; text-align: center; color: #111827; font-size: 24px;">
                Verify Your Email Address
            </h2>

            <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 20px;">
                Hello,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 25px;">
                Thank you for creating an account with us. To complete your registration,
                please use the verification code below:
            </p>

            <!-- OTP -->
            <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; background-color: #f0f7ff; border: 1px solid #dbeafe; border-radius: 10px; padding: 18px 35px;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb;">
                        ${otp}
                    </span>
                </div>
            </div>

            <p style="text-align: center; font-size: 14px; color: #6b7280; margin: 0 0 30px;">
                This verification code will expire in <strong>10 minutes</strong>.
            </p>

            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;">

            <!-- Security Notice -->
            <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 0 0 15px;">
                <strong>Security notice:</strong> Never share this verification code with
                anyone. Our team will never ask you for your OTP.
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 0;">
                If you did not request this verification code, you can safely ignore this
                email. Your account remains secure.
            </p>

            <!-- Footer -->
            <div style="margin-top: 35px; text-align: center;">
                <p style="font-size: 14px; color: #9ca3af; margin: 0;">
                    Best regards,<br>
                    <strong style="color: #4b5563;">practice session</strong>
                </p>
            </div>

        </div>

        <!-- Copyright -->
        <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
            © 2026 practice session. All rights reserved.
        </p>

    </div>
</div>
    `;
}

module.exports = {
    generateOtp,
    generateEmailHtml
};


