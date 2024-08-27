import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Experience } from "../models/experienceSchema.js";
// import { Timeline } from "../models/timelineSchema.js";

export const postExperience = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newExperience = await Experience.create({
    title,
    description,
    experience: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Experience Added!",
    newExperience,
  });
});

export const deleteExperience = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let experience = await Experience.findById(id);
  if (!experience) {
    return next(new ErrorHandler("Experience not found", 404));
  }
  await experience.deleteOne();
  res.status(200).json({
    success: true,
    message: "Experience Deleted!",
  });
});

export const getAllExperience = catchAsyncErrors(async (req, res, next) => {
  const experience = await Experience.find();
  res.status(200).json({
    success: true,
    experience,
  });
});
