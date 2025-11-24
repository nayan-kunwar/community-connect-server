import { Router } from "express";
import { verifyToken } from "../middlewares/index.js";
import { createIssue, getAllIssues } from "../controllers/issue.controller.js";

const router = Router();

router.route("/").post(verifyToken, createIssue).get(getAllIssues);

export default router;
