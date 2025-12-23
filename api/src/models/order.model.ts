import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        items: [
            {
                productId: String,
                name: String,
                price: Number,
                quantity: Number,
            }
        ],
        totalAmout: {
            type: Number,
            required: true,
        },
        paymentIntentId: {
        type: String,
        required: true,
        unique: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);