import connectDb from "@/app/utils/connectDB";
import Order from "@/app/models/order";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDb();

    try {
    
    
      
      const { items,userid, address, city, country, paymentMethod, finalamounts,totalProducts } = req.body;

      if (!items) {
        return res.status(400).json({ error: "Cart items are required" });
      }

      if (!address || !city || !country || !paymentMethod) {
        return res
          .status(400)
          .json({
            error: "Address, city, country, and payment method are required",
          });
      }

      const newOrder = new Order({
        user: userid,
        cartItems: items,
        shippingDetails: { address, city, country },
        paymentMethod,
        orderStatus: "Pending",
        finalamounts,
        totalProducts
      });

      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
      console.error("Error placing order:", error.message);
      res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
