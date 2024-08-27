import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  experience: {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  },
});

export const Experience = mongoose.model("Experience", experienceSchema);
