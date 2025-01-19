import connectDb from "@/app/utils/connectDB";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const jwtSecret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    try {
      await connectDb();
      console.log("Database connected successfully");
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return res.status(500).json({ success: false, message: "Failed to connect to the database" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ success: false, message: "User password is not set" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      jwtSecret,
      { expiresIn: '72h' } 
    );

    res.setHeader('Set-Cookie', `token=${token}; Path=/; Max-Age=86400; Secure; SameSite=Strict`);


    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error in login handler:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
