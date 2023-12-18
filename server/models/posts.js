const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  comments: [
    {
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: DateTime.fromJSDate(Date.now).toLocaleString(
          DateTime.DATE_SHORT
        ),
      },
    },
  ],
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

PostSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATE_SHORT
  );
});

PostSchema.set("toObject", { virtuals: true });
PostSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);
