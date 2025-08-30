import mongoose from "mongoose";
const Schema = mongoose.Schema

const certificateShema = new Schema({
    certificateImg: {type: String, required: true},
    title: {type: String, required: true},
    verify: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

export default mongoose.model("Certificate", certificateShema)