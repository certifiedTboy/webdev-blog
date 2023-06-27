import mongoose from "mongoose";

const Schema = mongoose.Schema;
const visitSchema = new Schema(
  {
    url: {
      type: String,
      default: "localhost:3000",
    },
    ipData: Array,
    counter: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Visits = mongoose.model("visits", visitSchema);

export default Visits;
