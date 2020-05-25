const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt');
const AdminSchema = new Schema({
    firstname:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required: true,
    },
     email:{
        type:String,
        required: true,
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
      },
      token:{
          type:String
      }
},{
    timestamps:true
})
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });
const Admin = mongoose.model('Admin',AdminSchema);
module.exports = Admin