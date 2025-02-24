const express = require("express")
const route = express.Router()
const ctl = require("../controllers/categoryctl")
const passport = require("passport")
const multer = require("../middlewere/multer")


route.get("/addcat" , passport.checkAuth, ctl.addcat)
route.get("/viewcat" , passport.checkAuth, ctl.viewcat)
route.post("/addcategory" ,multer, ctl.addcategory)

module.exports = route;