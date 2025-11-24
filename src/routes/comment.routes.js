import { Router } from "express";
import {
  createComment,
  getIssueComments,
} from "../controllers/comment.controller.js";

const router = Router();

router
  .route("/issues/:issueId/comments")
  .post(createComment)
  .get(getIssueComments);

// // single comment
// router
//   .route("/comments/:commentId")
//   .get(getComment)
//   .patch(protect, updateComment)
//   .delete(protect, deleteComment);

// // replies of a comment
// router.get("/comments/:commentId/replies", getCommentReplies);

//===================================
// // reactions
// router.post("/comments/:commentId/reactions", protect, addReaction);
// router.delete(
//   "/comments/:commentId/reactions/:type",
//   protect,
//   removeReaction
// );

export default router;
