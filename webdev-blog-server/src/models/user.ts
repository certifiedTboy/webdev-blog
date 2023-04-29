import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
        type: String,
        trim: true
      },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    
    password: {
      type: String,
      trim: true,
    },
    userType: {
      type:String,
      default:"User"
    },

    profilePicture: {
      type: String,
      default: "uploads/dummyImage.jpg"
    },

    about: {
      type: String,
    },
    followers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        name: String
      },
    ],
    following: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        name: String
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User
