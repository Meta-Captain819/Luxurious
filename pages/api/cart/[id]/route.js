import connectDb from "@/app/utils/connectDB";
import Cart from "@/app/models/cart";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId format" });
      }

      const objectId = new ObjectId(id);

      await connectDb();

      const deletedItem = await Cart.findOneAndDelete({ _id: objectId });

      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found in cart" });
      }

      return res.status(200).json({ message: "Item successfully removed from cart" });
    } catch (error) {
      console.error("Error deleting cart item:", error);
      return res.status(500).json({ error: "Internal server error while deleting item" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
