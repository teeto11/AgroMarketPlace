const adminService = require('../services/admin')
const Response = require('../lib/response_manager');
const HttpStatus = require('../constants/httpStatus');
const adminSchema = require('../core/validation/schemas/adminSchema');
const validate = require('../core/validation/validate');

const register = async (req,res) => {
    const request = req.body;
    const { value, error } = validate(request, adminSchema);
    if(error) {
        return Response.failure(res, {
          message: error,
        }, HttpStatus.BadRequest);
      }
}


module.exports={
    register
}