const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed {ARGS[1]} characters.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Email must be valid.'
  })
];

const ageValidator = [
  // TODO: Make some validations here...
];

const genderValidator = [
  // TODO: Make some validations here...
];

// Define the database model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: emailValidator
  },
  age: {
    type: Number,
    validate: ageValidator
  },
  sex: {
    type: String,
    validate: genderValidator
  },
  country:{
    type: String,
    required: [true, 'Country is required.'],
  },
  status:{
    type: String,
    required: [true, 'Marital Status is required.'],
  },
  pob:{
    type: String,
    required: [true, 'State is required.'],
  },
  rfid:{
    type: String,
    required: [true, 'Passport Code is required.']
  }

});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('User', UserSchema);
