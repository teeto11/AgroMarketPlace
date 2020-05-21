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


module.exports={
    save,
    updateMarket,
    getMarkets,
    deleteMarket
}