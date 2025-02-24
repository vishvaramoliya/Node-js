const express = require("express");
const route = express.Router();
const ctl = require("../controllers/ctl");
const upload = require("../middlewere/multer");


route.get("/" , ctl.login);
route.post("/userLogin" , ctl.userLogin);
route.get("/logout" , ctl.logout);
route.get("/home" , ctl.home);

route.get("/addRecipe" , ctl.addRecipe);
route.post("/addData" , upload, ctl.addData);
route.get("/deleteData" , upload, ctl.deleteData);
route.get("/editData" , upload, ctl.editData);
route.post("/updateData" ,upload, ctl.updateData);

route.get("/addadmin" , ctl.addadmin);
route.post("/addadminedata" , upload, ctl.addadminedata);
module.exports = route;
