const Joi = require("joi");
const mongoose = require("mongoose");
const patientValidationSchema = Joi.object({
  patientName: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Patient name is required",
      "any.required": "Patient name is required",
    }),
  
  gender: Joi.string()
    .valid("male", "female", "other")
    .required()
    .messages({
      "any.only": "Gender must be one of male, female, or other",
      "any.required": "Gender is required",
    }),
  
  doctorName: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Doctor name is required",
      "any.required": "Doctor name is required",
    }),
  
  testFee: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Test fee must be a number",
      "number.min": "Test fee cannot be negative",
      "any.required": "Test fee is required",
    }),
  
  dripFee: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Drip fee must be a number",
      "number.min": "Drip fee cannot be negative",
      "any.required": "Drip fee is required",
    }),
  
  age: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Age must be a number",
      "number.min": "Age cannot be negative",
      "any.required": "Age is required",
    }),
  
  doctorFee: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Doctor fee must be a number",
      "number.min": "Doctor fee cannot be negative",
      "any.required": "Doctor fee is required",
    }),
  
  procedure: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Procedure details are required",
      "any.required": "Procedure details are required",
    }),
  
  stitchFee: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Stitch fee must be a number",
      "number.min": "Stitch fee cannot be negative",
      "any.required": "Stitch fee is required",
    }),
});


const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "Patient name is required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
  },
  doctorName: {
    type: String,
    required: [true, "Doctor name is required"],
    trim: true,
  },
  testFee: {
    type: Number,
    required: [true, "Test fee is required"],
    min: [0, "Test fee cannot be negative"],
  },
  dripFee: {
    type: Number,
    required: [true, "Drip fee is required"],
    min: [0, "Drip fee cannot be negative"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [0, "Age cannot be negative"],
  },
  doctorFee: {
    type: Number,
    required: [true, "Doctor fee is required"],
    min: [0, "Doctor fee cannot be negative"],
  },
  procedure: {
    type: String,
    required: [true, "Procedure details are required"],
    trim: true,
  },
  stitchFee: {
    type: Number,
    required: [true, "Stitch fee is required"],
    min: [0, "Stitch fee cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const patientUser = new mongoose.Schema({
  name :{
    type: String,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  
  },
  password: {
    type: String,
    required: true,
  },
role:{
  type: String,
  enum: ['admin', 'user'],
}
},{timestamps: true});


// Joi validation schema for patientUser
const patientUserSchema = Joi.object({
  name: Joi.string().optional(),  // Name is optional
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Please input a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  role: Joi.string().valid('admin', 'user').optional().messages({
    'string.base': 'Role should be a string',
    'any.only': 'Role must be one of [admin, user]'
  })
});



const User = mongoose.model('patientUser', patientUser);
const Patient = mongoose.model("Patient", patientSchema);
module.exports ={
    Patient,
    patientValidationSchema,
    User,
    patientUserSchema
}
