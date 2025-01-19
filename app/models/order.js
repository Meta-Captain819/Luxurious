import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    cartItems: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingDetails: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    finalamounts: { type: "string", required: true },
    totalProducts:{ type: Number, required: true },
    orderStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
