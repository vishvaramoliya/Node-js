const express = require("express");
const route = express.Router();
const ctl = require("../controllers/ctl");
const upload = require("../middlewere/multer");


route.get("/" , ctl.firstpage);
route.get("/singleMovie" , ctl.singleMovie);
route.get("/addMovie" , ctl.addMovie);
route.post("/addData" , upload, ctl.addData);
route.get("/deleteData" , upload, ctl.deleteData);
route.get("/editData" , upload, ctl.editData);
route.post("/updateData" ,upload, ctl.updateData);

module.exports = route;
