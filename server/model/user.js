const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String, get: function (val) {
      console.log(this._id.toString(), "$$$$$$$$$$$$$$$$$$$");
      return this._id.toString()
    },
    unique: true
  },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  user_type: { type: Number, default: 0 },
  educations: { type: Array, default: [] }
},
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = mongoose.model("user", userSchema);