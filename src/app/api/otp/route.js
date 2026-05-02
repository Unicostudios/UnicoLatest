const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function encodeOTP(otp, phone) {
  const expiry = Date.now() + 5 * 60 * 1000;
  const data = `${otp}:${phone}:${expiry}`;
  return Buffer.from(data).toString("base64");
}

function decodeOTP(token) {
  try {
    const data = Buffer.from(token, "base64").toString("utf8");
    const [otp, phone, expiry] = data.split(":");
    return { otp, phone, expiry: parseInt(expiry) };
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const { action, phone, otp, token } = await request.json();

    if (action === "send") {
      if (!phone) {
        return Response.json({ error: "Phone number required" }, { status: 400 });
      }

      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      const otpToken = encodeOTP(generatedOTP, phone);

      await client.messages.create({
        body: `Your Unico Studios verification code is: ${generatedOTP}. Valid for 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      console.log("OTP sent to:", phone);
      return Response.json({ success: true, token: otpToken });
    }

    if (action === "verify") {
      if (!phone || !otp || !token) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
      }

      const decoded = decodeOTP(token);

      if (!decoded) {
        return Response.json({ error: "Invalid token. Please request a new OTP." }, { status: 400 });
      }

      if (Date.now() > decoded.expiry) {
        return Response.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
      }

      if (decoded.phone !== phone) {
        return Response.json({ error: "Phone number mismatch." }, { status: 400 });
      }

      if (decoded.otp !== otp) {
        return Response.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
      }

      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("OTP error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
