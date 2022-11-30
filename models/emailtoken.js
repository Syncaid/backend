import mongoose from "mongoose";
const { Schema, model } = mongoose;

const emailtokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Emailtoken = mongoose.model("emailtoken", emailtokenSchema);

export default Emailtoken;
