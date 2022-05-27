require('../../paint-console/color-code');
const { ObjectId } = require('mongodb');
const Education = require("../model/education");

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

    // check if education already exist
    const oldEducation = await Education.findOne({ email: req.user['email'] });

    if (oldEducation) {
      // Add education in our database..
      const newEducation = await Education.findOneAndUpdate({ email: req.user['email'] }, {
        $push: {
          educations: {
            education,
            course,
            specialization,
            university_institute,
            course_type,
            passing_out,
            grading
          }
        }
      }, { new: true });

      // return new education..
      return res.status(201).json(newEducation);
    }

    // Create education in our database
    const newEducation = await Education.create({
      email: req.user['email'],
      educations: [{
        education,
        course,
        specialization,
        university_institute,
        course_type,
        passing_out,
        grading
      }]
    });

    // return new education..
    return res.status(201).json(newEducation);

  } catch (error) {
    console.error(error);
  }
};

exports.updateEducation = async (req, res) => {
  console.log(req.params);
  try {
    const { education,
      course,
      specialization,
      university_institute,
      course_type,
      passing_out,
      grading } = req.body;
    const { id } = req.params;

    // Validate user input
    if (!(id && education && course && specialization && university_institute && passing_out)) {
      return res.status(400).send("All input is required");
    }

    // Add education in our database..
    const newEducation = await Education.findOneAndUpdate(
      { email: req.user['email'], "educations._id": ObjectId(id) }, {
      $set: {
        "educations.$.education": education,
        "educations.$.course": course,
        "educations.$.specialization": specialization,
        "educations.$.university_institute": university_institute,
        "educations.$.course_type": course_type,
        "educations.$.passing_out": passing_out,
        "educations.$.grading": grading
      }
    }, { new: true });

    // return new education..
    return res.status(201).json(newEducation);

  } catch (error) {
    console.error(error);
  }
};

exports.getEducation = async (req, res) => {
  try {
    const { user_id } = req.user;

    // check if education already exist
    const education = await Education.findOne({ user_id });

    if (education) {
      return res.status(200).send(education);
    }

    return res.status(200).send({});

  } catch (error) {
    console.error(error);
  }
}