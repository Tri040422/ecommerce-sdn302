import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    products: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
