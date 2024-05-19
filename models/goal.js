const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: [true, "Must enter goal date"],
    },
    targetRuns: {
      type: Number,
      min: [1, "Must be 1 or greater"],
      required: [true, "Must enter goal target"],
    },
    runs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Run",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
