const express = require("express")
const route = express.Router()
const passport = require("passport")
const ctl = require("../controllers/subcategoryctl");
const multer = require("../middlewere/multer");

route.get("/addsubcat" , passport.checkAuth , ctl.addsubcat);
route.get("/viewsubcat" , passport.checkAuth , ctl.viewsubcat)
route.post("/addsubcategory",multer, ctl.addsubcategory)

module.exports = route