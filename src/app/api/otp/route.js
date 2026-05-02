const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const otpStore = new Map();

export async function POST(request) {
  try {
    const { action, phone, otp } = await request.json();

    if (action === "send") {
      if (!phone) {
        return Response.json({ error: "Phone number required" }, { status: 400 });
      }

      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore.set(phone, { otp: generatedOTP, expiry });

      await client.messages.create({
        body: `Your Unico Studios verification code is: ${generatedOTP}. Valid for 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      console.log("OTP sent to:", phone);
      return Response.json({ success: true, message: "OTP sent successfully" });
    }

    if (action === "verify") {
      if (!phone || !otp) {
        return Response.json({ error: "Phone and OTP required" }, { status: 400 });
      }

      const stored = otpStore.get(phone);

      if (!stored) {
        return Response.json({ error: "OTP expired or not found. Please request a new one." }, { status: 400 });
      }

      if (Date.now() > stored.expiry) {
        otpStore.delete(phone);
        return Response.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
      }

      if (stored.otp !== otp) {
        return Response.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
      }

      otpStore.delete(phone);
      return Response.json({ success: true, message: "Phone verified successfully" });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("OTP error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
