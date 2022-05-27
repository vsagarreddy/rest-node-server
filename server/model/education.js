const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  email: { type: String, unique: true },
  id: {
    type: String, get: function (val) {
      return this._id.toString()
    },
    unique: true
  },
  educations: [new Schema({
    id: {
      type: String, get: function (val) {
        console.log(this._id.toString(), "$$$$$$$$$$$$$$$$$$$");
        return this._id.toString()
      },
      unique: true
    },
    education: { type: String, default: null, required: true },
    course: { type: String, default: null, required: true },
    specialization: { type: String, default: null, required: true },
    university_institute: { type: String, default: null, required: true },
    course_type: { type: String, default: null },
    passing_out: { type: String, default: null, required: true },
    grading: { type: String, default: null }
  }, {
    toJSON: {
      getters: true
    }
  })]
}, {
  toJSON: {
    getters: true
  }
});

module.exports = mongoose.model("education", educationSchema);