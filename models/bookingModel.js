import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        show: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shows",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        seats: {
            type: Array,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("bookings", bookingSchema);