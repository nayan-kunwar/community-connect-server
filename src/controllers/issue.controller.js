import { Issue } from "../models/index.js";
import ApiError from "../utils/errors/api-error.js";

export const createIssue = async (req, res) => {
  const { title, description, lat, lng, address } = req.body;
  // Create location object only if coords exist
  let location;
  if (lat && lng) {
    location = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };
  }
  const issue = await Issue.create({
    title,
    description,
    images: req.body.images, // change it to req.files if using multer
    location,
    address,
    reporter: req.user._id,
  });

  if (!issue) {
    throw new ApiError("Issue creation failed", 500);
  }

  res.status(201).json({
    success: true,
    message: "Issue created successfully",
    data: issue,
  });
};

export const getAllIssues = async (req, res) => {
  const issues = await Issue.find().populate("reporter", "name email");

  res.status(200).json({
    success: true,
    message: "Issues fetched successfully",
    data: issues,
  });
};
