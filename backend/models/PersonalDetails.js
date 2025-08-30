import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    platform: { type: String, required: true },
    icon: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const detailsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileImg: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  passionateIn: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: "passionate cannot be empty",
    },
    required: true,
  },
  tagLine: { type: String, required: true },
  about: { type: String, required: true },
  contact: { type: [contactSchema], required: true },
});

export default mongoose.model("PersonalDetails", detailsSchema);
