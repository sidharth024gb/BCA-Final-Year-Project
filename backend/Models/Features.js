import mongoose from "mongoose";

const featuresSchema = new mongoose.Schema({
    featureImage: String,
    featureTitle: String,
    featureDescription: String,
})

const features = mongoose.model("features", featuresSchema);

export default features;