const express = require("express")
const route = express.Router()
const passport = require("passport")
const ctl = require("../controllers/productctl")
const upload = require("../middlewere/multer")

route.get("/addProduct" ,passport.checkAuth, ctl.addProduct)
route.get("/viewProduct" ,passport.checkAuth, ctl.viewproduct)
route.post("/addproduct2",upload ,passport.checkAuth, ctl.addproduct2)

module.exports = route