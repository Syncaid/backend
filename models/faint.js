import { Long } from "bson";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const faintSchema = new Schema(
  {
    Date: {
      type: Date,
    },
    UserId: { type: String },
    Duration: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Faint = mongoose.model("faint", faintSchema);

export { Faint };
