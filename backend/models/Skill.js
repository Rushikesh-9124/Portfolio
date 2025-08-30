import mongoose from "mongoose";
const Schema = mongoose.Schema

const skillSchema = new Schema({
    skillImg: {type: String, required: true},
    title: {type: String, required: true},
    progress: {type: String, required: true},
    category: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
})

export default mongoose.model("Skill", skillSchema)