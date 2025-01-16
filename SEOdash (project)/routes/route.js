const express = require("express");
const route = express.Router();
const ctl = require("../controllers/ctl");
const upload = require("../middlewere/multer");

route.get("/" , ctl.login);
route.post("/userLogin" , ctl.userLogin);
route.get("/logout" , ctl.logout);
route.get("/dashboard" , ctl.dashboard);

route.get("/addadmin" ,  ctl.addadmin);
route.get("/viewadmin" , ctl.viewadmin);

route.post("/addData" , upload ,  ctl.addadminData);
route.get("/deleteData" , upload ,  ctl.deleteData);
route.get("/editData" , upload , ctl.editData);
route.post("/updateData" , upload , ctl.updateData);

module.exports = route;