import { Router } from "express";
import { uploadImages } from "../middlewares/index.js";
import {
  createIssue,
  getAllIssues,
  getIssueById,
} from "../controllers/issue.controller.js";

const router = Router();

router
  .route("/")
  .post(uploadImages.array("images", 5), createIssue)
  .get(getAllIssues);
router.route("/:id").get(getIssueById);

export default router;
