const marketModel = require('../models/Market')
const save = (param) => {
   // console.log(param)
    const market = new marketModel(param)
    return market.save()
}
const updateMarket = async (idObj,input) => {
    const update = await marketModel.updateMany(idObj,input);
    return update;
}
const getMarkets = async (query) => marketModel.find(query)

const deleteMarket = (paramObj) => marketModel.deleteOne(paramObj)

const getMarketByLocation = async ({latitude,longitude}) => {
   const markets = await marketModel.find({address:{$near:[longitude,latitude], $maxDistance: 5} }); 
    return markets
  
}
module.exports={
    save,
    updateMarket,
    getMarkets,
    deleteMarket,
    getMarketByLocation
}