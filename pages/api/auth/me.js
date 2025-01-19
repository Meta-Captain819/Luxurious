import jwt from "jsonwebtoken";
import connectDb from "@/app/utils/connectDB";
import User from "@/app/models/User";

export default async function handler(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDb();
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
