import connectDb from "@/app/utils/connectDB";
import newsletter from "@/app/models/newsletter";

export default async function handler(req, res) {
  await connectDb(); 

  if (req.method === "POST") {
    try {
      const { name, userId, email } = req.body;

      console.log("Received body:", req.body);

      if (!name || !userId || !email) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required." });
      }

      const existingSubscription = await newsletter.findOne({ email });
      if (existingSubscription) {
        return res
          .status(409)
          .json({ success: false, message: "Email is already subscribed." });
      }

      const newSubscription = new newsletter({ name, userId, email });
      await newSubscription.save();

      return res
        .status(201)
        .json({ success: true, message: "Subscription successful." });
    } catch (error) {
      console.error("Error saving subscription:", error);
      return res
        .status(500)
        .json({ success: false, message: "Server error. Please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed.` });
  }
}
