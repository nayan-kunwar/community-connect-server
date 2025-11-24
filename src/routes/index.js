import { Router } from "express";
import authRoutes from "./auth.routes.js";
import issueRoutes from "./issue.routes.js";
import commentRoutes from "./comment.routes.js";

const router = Router();

// API versioning
router.use("/v1/auth", authRoutes);
router.use("/v1/issues", issueRoutes);
router.use("/v1", commentRoutes);

export default router;
