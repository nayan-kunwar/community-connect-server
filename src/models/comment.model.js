import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },

    // // You can support mentions, reactions, attachments etc.
    // mentions: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],

    // reactions: {
    //   // e.g. { "like": 3, "heart": 1 }
    //   type: Map,
    //   of: Number,
    //   default: {},
    // },

    // create zod schema 
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
