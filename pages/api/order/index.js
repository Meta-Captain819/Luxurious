import connectDb from "@/app/utils/connectDB";
import order from "@/app/models/order";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed. Use POST." });
  }

  try {
    await connectDb();

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const orders = await order.find({ user: userObjectId });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
}
