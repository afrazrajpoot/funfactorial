const { Patient, patientValidationSchema, User, patientUserSchema } = require("../models/patientModel");
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const bcrypt = require('bcrypt');

createPatientRecord = async (req, res, next) => {
    try {
        // Validate the request body using the patientValidationSchema
        const { error } = patientValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: `Validation failed: ${error.details[0].message}`
            });
        }

        // Create a new patient record
        const patient = await Patient.create(req.body);

        // Respond with success
        res.status(201).json({
            message: 'Patient record created successfully',
            patient
        });
    } catch (err) {
        // Respond with a server error if something goes wrong
        res.status(500).json({
            message: err.message || 'Server Error'
        });
    }
};


const getPatientRecord = async (req, res) => {
  try {
      // Get the page number from the query string, default to page 1 if not provided
      const page = parseInt(req.query.page) || 1;
      
      // Number of records per page
      const limit = 4;
      
      // Calculate the number of documents to skip
      const skip = (page - 1) * limit;
      
      // First, get the total count of documents
      const totalDocs = await Patient.countDocuments();
      
      // Calculate total pages
      const totalPages = Math.ceil(totalDocs / limit);
      
      // Fetch the patient records with pagination and sort by latest
      const patients = await Patient.find()
          .sort({ createdAt: -1 }) // Sort by `createdAt` field in descending order (latest first)
          .skip(skip)
          .limit(limit);
      
      // Respond with the patient records and pagination info
      res.status(200).json({
          patients,
          currentPage: page,
          totalPages,
          totalDocs,
          recordsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
      });
  } catch (err) {
      res.status(500).json({ message: err.message || 'Server Error' });
  }
};


getPatientRecordById = async (req,res)=>{
    try{
        const patient = await Patient.findById(req.params.id);
        if(!patient){
            return res.status(404).json({message: 'Patient not found'});
        }
        res.status(200).json(patient);

    }catch(err){
        res.status(500).json({message:err.message || 'Server Error'});
    }
}

updatePatientRecord = async (req,res)=>{
    try{
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true});
        if(!patient){
            return res.status(404).json({message: 'Patient not found'});
        }
        res.status(200).json(patient);

    }catch(err){
        res.status(500).json({message:err.message || 'Server Error'});
    }
}

deletePatient = async (req,res)=>{
    try{
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if(!patient){
            return res.status(404).json({message: 'Patient not found'});
        }
        res.status(200).json({message: 'Patient deleted successfully'});

    }catch(err){
        res.status(500).json({message:err.message || 'Server Error'});
    }
}



signUp = async (req, res) => {
  try {
    // Validate the incoming data using Joi
    const { error } = patientUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `Validation failed: ${error.details[0].message}`,
      });
    }

    // Check if the email already exists in the database
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,  // Store the hashed password
    });

    // Respond with success message
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });

  } catch (err) {
    res.status(500).json({ message: err.message || 'Server Error' });
  }
};





signIn = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists and password is correct
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the plain password with the hashed password using bcrypt
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email,role:user.role }, // Payload: user ID and email
      process.env.JWT_SECRET, // Secret key (use environment variable for security)
      { expiresIn: '1d' } // Token expiration time (e.g., 1 day)
    );

    // Send response with token
    res.json({
      message: 'Logged in successfully',
      user,
      token, // Include the token in the response
    });

  } catch (err) {
    res.status(500).json({ message: err.message || 'Server Error' });
  }
};


module.exports = {
  createPatientRecord,
  getPatientRecord,
  getPatientRecordById,
  updatePatientRecord,
  deletePatient,
  signIn,
  signUp
};
