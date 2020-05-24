const marketService = require('../services/market')
const Response = require('../lib/response_manager');
const HttpStatus = require('../constants/httpStatus');
const marketSchema = require('../core/validation/schemas/marketSchema');
const validate = require('../core/validation/validate');
const fs = require('fs');
const createMarket = async (req,res) => {
   // console.log(req.files)
    const input = req.body
    const {error,value} = validate(input,marketSchema)
    if(error){
        return Response.failure(res,{
            message:error,
            data: [],
        },HttpStatus.BadRequest)
    }
    
   try{
        const {name,description,category,address} = value;
         const buffer = [];
           req.files.map((file)=>{
                buffer.push(file.buffer.toString('base64'))     
         })
        const marketObj = {
            name,
            description,
            category,
            address,
            image:buffer,
        }
        const data = await marketService.save(marketObj)
        if(data){
            return Response.success(res,{
                message: 'saved successfully',
                data
            },HttpStatus.CREATED)
        }
    }catch(e){
            console.log(e);
            return Response.failure(res,{
                message:'something went wrong'
            },HttpStatus.INTERNAL_SERVER_ERROR)
    }

}
const updateMarket = async(req,res) => {
    const {id} = req.body;
    const input = req.body;
    if(!id){
       return Response.failure(res,{
            message: 'ID is required',
            data: []
       },HttpStatus.BadRequest)
    }
    try{
        const idObj = {
            _id:id
        }
        delete input.id;
        const data = await marketService.updateMarket(idObj,input)
        return Response.success(res,{
            message: 'field successfully updated',
            data
        },HttpStatus.OK)
    }catch(e){
        console.log(e);
        return Response.failure(res,{
            message:'something went wrong'
        },HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
const getMarkets = async(req,res) => {

    const {query} = req
    try{
        if(query.latitude && query.longitude){
            const marketParam = {
                latitude:query.longitude,
                longitude:query.longitude
            }
            const getMarketByLocation = await marketService.getMarketByLocation(marketParam)
           return Response.success(res,{
            message:"markets successfully fetched",
            data:getMarketByLocation
        },HttpStatus.OK)
        }
        const markets = await marketService.getMarkets(query)
        if(markets){
            return Response.success(res,{
                message:"markets successfully fetched",
                data:markets
            },HttpStatus.OK)
        }
        return Response.failure({
            message:"cant find any match",
            data:[]
        },HttpStatus.Conflict)
    }catch(e){
        console.log(e);
        return Response.failure(res,{
            message:'something went wrong'
        },HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
const deleteMarket = async (req,res) => {
    const input = req.body
    console.log(input)
    const objParam = {
        _id:input.id
    }
    try{
        const data = await marketService.deleteMarket(objParam)
        return Response.success(res,{
            message: 'field successfully updated',
            data
        },HttpStatus.OK)
    }catch(e){
        console.log(e);
        return Response.failure(res,{
            message:'something went wrong'
        },HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
module.exports  = {
    createMarket,
    updateMarket,
    getMarkets,
    deleteMarket,
}