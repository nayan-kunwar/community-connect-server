import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "../config/config.js";
import { generateToken } from "../utils/jwt.js";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
});

// Pre-save hook to hash password
UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate Access Token
UserSchema.methods.generateAccessToken = function () {
  return generateToken(
    { _id: this._id, username: this.username, email: this.email },
    config.ACCESS_TOKEN_SECRET,
    "access"
  );
};

// Generate Refresh Token
UserSchema.methods.generateRefreshToken = function () {
  return generateToken(
    { id: this._id, username: this.username, email: this.email },
    config.REFRESH_TOKEN_SECRET,
    "refresh"
  );
};

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
