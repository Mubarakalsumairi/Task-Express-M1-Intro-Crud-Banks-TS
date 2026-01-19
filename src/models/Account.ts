import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    funds: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
