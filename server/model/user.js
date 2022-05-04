const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  user_type: { type: Number, default: 0 },
  education: [new Schema({
    education: { type: String, default: null, required: true },
    course: { type: String, default: null, required: true },
    specialization: { type: String, default: null, required: true },
    university_institute: { type: String, default: null, required: true },
    course_type: { type: String, default: null },
    passing_out: { type: String, default: null, required: true },
    grading: { type: String, default: null }
  }, { _id: false })]
});

module.exports = mongoose.model("user", userSchema);