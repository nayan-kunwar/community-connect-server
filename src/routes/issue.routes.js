import { Router } from "express";
import { verifyToken } from "../middlewares/index.js";
import { createIssue } from "../controllers/issue.controller.js";

const router = Router();

router.route("/").post(createIssue);

export default router;
