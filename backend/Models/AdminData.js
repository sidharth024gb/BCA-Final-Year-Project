import mongoose from "mongoose";

const adminDataSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const adminData = mongoose.model("admin-data", adminDataSchema);

export default adminData;