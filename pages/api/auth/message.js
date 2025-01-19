import connectDb from "@/app/utils/connectDB";
import Message from "@/app/models/message"; 

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDb();

      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      const newMessage = new Message({ name, email, message });
      await newMessage.save();

      return res.status(201).json({ status: "success", message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error saving message:", error);
      return res.status(500).json({ status: "error", message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ status: "error", message: `Method ${req.method} not allowed` });
  }
}
