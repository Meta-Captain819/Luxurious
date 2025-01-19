// pages/api/user/[query].js

import connectDb from "@/app/utils/connectDB";
import User from "@/app/models/User";

export default async function handler(req, res) {
  const { method } = req;
  const { query } = req.query; 

  
    await connectDb();

  

  if (method === "GET") {
    if (!query) {
      return res.status(400).json({ success: false, message: "Query parameter is required (id or email)" });
    }

    try {
      let user = null;

      if (/^[0-9a-fA-F]{24}$/.test(query)) {
        user = await User.findById(query);
      }

      if (!user && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(query)) {
        user = await User.findOne({ email: { $regex: new RegExp(`^${query}$`, 'i') } });
      }

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Error during user search:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
  }
}
