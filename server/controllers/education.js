require('../../paint-console/color-code');
const User = require("../model/user");

exports.addEducation = async (req, res) => {
  try {
    const { education,
      course,
      specialization,
      university_institute,
      course_type,
      passing_out,
      grading } = req.body;

    // Validate user input
    if (!(education && course && specialization && university_institute && passing_out)) {
      return res.status(400).send("All input is required");
    }

    // Add education to the user in our database..
    const user = await User.findOneAndUpdate({ user_id: req.user['user_id'] }, {
      $set: {
        education: [{
          education,
          course,
          specialization,
          university_institute,
          course_type,
          passing_out,
          grading
        }]
      }
    }, { new: true });

    // return new user
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};

exports.updateEducation = async (req, res) => {


  res.status(200).send({ education: 'Education' });
};

exports.getEducation = async (req, res) => {
  res.status(200).send({ education: 'Education' });
}