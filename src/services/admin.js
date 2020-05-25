const adminModel = require('../models/Admin');
const bcrypt = require('bcrypt')
const register = (value) => {
  const user = new adminModel(value);
  return user.save()
}

const getUser = (email) => adminModel.findOne(email)

module.exports = {
   register,
   getUser
}