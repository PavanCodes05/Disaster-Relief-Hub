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
    inventory: [
      {
        resource: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    recommendedPosts: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        title: { type: String, required: true },
        description: { type: String, required: true },
        requiredResources: [
          {
            resource: { type: String, required: true },
            quantity: { type: Number, required: true },
          },
        ],
        location: { type: String, required: true },
        username: { type: String, required: true },
      },
    ],

    // Affected
    affectedPosts: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        title: { type: String, required: true },
        description: { type: String, required: true },
        requiredResources: [
          {
            resource: { type: String, required: true },
            quantity: { type: Number, required: true },
          },
        ],
        location: { type: String, required: true },
        username: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
