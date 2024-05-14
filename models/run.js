const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const clapSchema = new Schema(
  {
    clap: {
      type: String,
      enum: ["clap"],
    },
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

const runSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "must enter start date"],
    },
    month: {
      type: Date,
    },
    time: {
      type: Number,
      min: [1, "must be 1 or greater"],
      required: [true, "must enter a time"],
    },
    distance: {
      type: Number,
      min: [1, "must be 1 or greater"],
      required: [true, "must enter a distance"],
    },
    speed: {
      type: Number,
    },
    terrain: {
      type: String,
      enum: ["treadmill", "road", "track", "trail"],
      default: "treadmill",
    },
    status: {
      type: String,
      enum: ["complete", "planned"],
      default: "complete",
    },
    claps: [clapSchema],
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
module.exports = mongoose.model("Run", runSchema);
