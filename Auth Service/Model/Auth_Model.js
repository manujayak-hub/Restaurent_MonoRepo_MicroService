import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:{ type: String, required: true },
   
  },
  { timestamps: true }
);

export default model("User", userSchema);
