import mongoose from "mongoose";

const Newsletter = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Newsletter || mongoose.model("Newsletter", Newsletter);
