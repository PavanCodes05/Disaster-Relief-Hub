import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["affected", "donor"],
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Donors
    donations: {
      type: Number,
      default: 0,
    },
    inventory: [
      {
        resource: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    recommendedPosts: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
      },
    ],
    // Affected
    affectedPosts: [
      { id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" } },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
