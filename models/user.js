import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  username : { type: String  , required: true},
  coverpic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if the model already exists before defining it
const User = mongoose.models.users || model("users", userSchema, "LoginCredentials");

export default User;    
