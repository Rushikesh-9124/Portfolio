import mongoose from "mongoose";
const Schema = mongoose.Schema

const educationSchema = new Schema({
    degree: {type: String, required: true},
    course: {type: String, required: true},
    college: {type: String, required: true},
    from: {type: Number, required: true},
    to: {type: Number, required: true},
    grade: {type: Number, required: true},
}, {_id: false})

const problemSolvingSchema = new Schema({
    platform: {type: String, required: true},
    totalProblems: {type: Number, required: true},
    link: {type: String, required: true},
}, {_id: false})

const aboutSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    summary: {type: [String], required: true},
    education: {type: [educationSchema], required: true},
    problemSolving: {type: [problemSolvingSchema], required: true},
    courses: {type: [String], required: true}
}, {timestamps: true})

export default mongoose.model("About", aboutSchema)