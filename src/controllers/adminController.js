const adminService = require('../services/admin')
const Response = require('../lib/response_manager');
const HttpStatus = require('../constants/httpStatus');
const adminLogin = require('../core/validation/schemas/adminLogin');
const adminSchema = require('../core/validation/schemas/adminSchema');
const validate = require('../core/validation/validate');
const uuid = require('uuid-random');
const bcrypt = require('bcrypt')

const register = async (req,res) => {
    const request = req.body;
    const { value, error } = validate(request, adminSchema);
    if(error) {
        return Response.failure(res, {
          message: error,
        }, HttpStatus.BadRequest);
      }
      try{
         value.token = uuid();
         const data = await adminService.register(value);
         return Response.success(res,{
            message: 'admin user saved',
            data

         },HttpStatus.CREATED)

      }catch(e){
        console.log(e);
        return Response.failure(res,{
            message:'something went wrong'
        },HttpStatus.INTERNAL_SERVER_ERROR)
      }
}
const login = async(req,res) => {
    const request  = req.body;
    const {value,error} = validate(request,adminLogin)
    if(error) {
        return Response.failure(res, {
          message: error,
        }, HttpStatus.BadRequest);
      }try{
          const email = value.email
          const objParam ={
            email
          }
          const user = await adminService.getUser(objParam)
          if(!user){
            return Response.failure(res, {
                message: 'user with email not found',
              }, HttpStatus.Conflict);
          }
          const isMatched =  await bcrypt.compare(value.password,user.password)
          if(!isMatched){
            return Response.failure(res, {
                message: 'incorrect password',
              }, HttpStatus.Conflict);
          }
          user.token = uuid();
          return Response.success(res,{
            message: 'admin logged in',
            data:user
          },HttpStatus.OK)
      }catch(e){
        console.log(e);
        return Response.failure(res,{
            message:'something went wrong'
        },HttpStatus.INTERNAL_SERVER_ERROR)
      }
}


module.exports={
    register,
    login
}