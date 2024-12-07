import mongoose from "mongoose";

const notifcationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notifcationSchema);

export default Notification;
