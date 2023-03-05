import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            // minlength: 3,
            // maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            // lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 64,
        },
        picture : {
            type: String,
            default: "/avatar.png",
        },
        role: {
            type: [String],
            default: ["Subscriber"],
            enum: ["Subscriber", "Instructor", "Admin"],
        },
        stripe_account_id: "",
        stripe_seller: {},
        stripeSession: {},
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);