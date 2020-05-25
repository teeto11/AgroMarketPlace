const marketController = require('../controllers/marketController');
const multer = require('multer');
module.exports.setup = (app) =>{
    const upload = multer({
        //dest:'avatars',
        limits:{
            fileSize:1000000
        },
        fileFilter(req,file,cb){ 
    
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
               return cb(new Error('please upload a file that ends with jpg,jpeg or png'))
            }
            cb(undefined,'done')
        }
    })
    app.post(
        '/create-market',upload.array('image',3),
        (req,res) => marketController.createMarket(req,res),
    );
    app.patch(
        '/update-market',
        (req,res) => marketController.updateMarket(req,res),
    );
    app.get(
        '/all-markets',
        (req,res) => marketController.getMarkets(req,res),
    );
    app.delete(
        '/delete-market',
        (req,res) => marketController.deleteMarket(req,res),
    )
    
}