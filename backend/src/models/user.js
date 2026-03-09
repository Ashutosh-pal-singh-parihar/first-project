import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 10);

  // Normalize email
  if (this.isModified("email")) {
    this.email = this.email.trim().toLowerCase();
  }

  next();
});

// method for password check
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
