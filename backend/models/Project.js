import mongoose from "mongoose";
const Schema = mongoose.Schema

const projectSchema = new Schema({
    projectImg: {type: String, required: true},
    title: {type: String, required: true},
    github: {type: String},
    liveDemo: {type: String},
    technologies: {type: [String], required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

export default mongoose.model("Project", projectSchema)