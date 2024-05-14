const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: [true, "must enter start date"],
    },
    targetRuns: {
      type: Number,
      min: [1, "must be 1 or greater"],
      required: [true, "must enter a target"],
    },
    synced: {
      type: String,
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

// Compile the schema into a model and export it
module.exports = mongoose.model("Goal", goalSchema);
