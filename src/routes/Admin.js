const adminController = require('../controllers/adminController')

module.exports.setup = (app) => {
app.post(
    '/register',
(req,res) => adminController.register(req,res)
)
app.post(
    '/login',
(req,res) => adminController.login(req,res)
)
}