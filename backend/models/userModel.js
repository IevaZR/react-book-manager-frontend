import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  readingListBooks: [
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      bookCover: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: false,
      },
    },
  ],
  finishedBooks: [
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      bookCover: {
        type: String,
        required: true,
      },
      finished: {
        type: Boolean,
        required: false,
        default: false
      },
      rating: {
        type: Number,
        required: false,
      },
    },
  ],
});

export default mongoose.model("user", userSchema);
