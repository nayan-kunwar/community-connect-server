import { Issue } from "../models/index.js";
import ApiError from "../utils/errors/api-error.js";
import { uploadToImageKit } from "../utils/imagekit.js";

export const createIssue = async (req, res) => {
  const { title, description, lat, lng, address } = req.body;
  console.log(req.files);
  let images = [];
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map((file) =>
      uploadToImageKit(file.buffer, file.originalname)
    );
    images = await Promise.all(uploadPromises);
  }
  console.log("images: ", images);
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
    images,
    location,
    address,
    reporter: req?.user?._id || "691e1e8fb64eebfd9bdcdd65",
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

export const getIssueById = async (req, res) => {
  const { id } = req.params;
  const issue = await Issue.findById(id).populate(
    "reporter",
    "firstName lastName email"
  );

  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }
  res.status(200).json({
    success: true,
    message: "Issue fetched successfully",
    data: issue,
  });
};
