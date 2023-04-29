import mongoose from "mongoose";

const Schema = mongoose.Schema;
const verificationDataSchema = new Schema(
  {
    email: String, 
    verificationToken: String,
    expiresAt: 
    {
      type: Date, 
      default: Date.now()
    }
  },
  { timestamps: true }
);

const VerificationData = mongoose.model("verificationData", verificationDataSchema);

export default VerificationData
