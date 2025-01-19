import connectDb from "@/app/utils/connectDB";
import Cart from "@/app/models/cart";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("Connecting to database...");
      await connectDb();
      console.log("Database connected!");

      const { id, name, price, image } = req.body;
      console.log("Received data:", { id, name, price, image });

      if (!id || !name || !price || !image) {
        console.error("Validation failed: Missing fields");
        return res.status(400).json({ error: "All fields are required" });
      }

      const existingCartItem = await Cart.findOne({ id });

      if (existingCartItem) {
        console.log("Product already in cart. Incrementing quantity...");
        existingCartItem.quantity += 1; 
        await existingCartItem.save();
        console.log("Quantity updated successfully!");
        return res.status(200).json({ message: "Quantity updated successfully!" });
      } else {
        console.log("Adding new product to the cart...");
        const newCartItem = new Cart({ id, name, price, image, quantity: 1 });
        await newCartItem.save();
        console.log("Product added to cart successfully!");
        return res.status(201).json({ message: "Product added to cart!" });
      }
    } catch (error) {
      console.error("Error in API handler:", error.message);
      return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
  } else if (req.method === "GET") {
    try {
      const cartItems = await Cart.find();
      return res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      return res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
