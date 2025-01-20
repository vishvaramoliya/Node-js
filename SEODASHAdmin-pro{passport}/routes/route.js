const express = require("express");
const route = express.Router();
const ctl = require("../controllers/ctl");
const upload = require("../middlewere/multer");
const passport = require("passport");
const checkAuth = require("../middlewere/checkAuth");

route.post(
    "/userLogin" ,
    passport.authenticate("local" , {failureRedirect : "/"}),
    ctl.userLogin
);


route.get("/" , ctl.login);
// route.post("/userLogin" , ctl.userLogin);
route.get("/logout" , ctl.logout);
route.get("/dashboard" ,checkAuth, ctl.dashboard);

route.get("/addadmin" , checkAuth , ctl.addadmin);
route.get("/viewadmin" , checkAuth , ctl.viewadmin);

route.post("/addData" , upload ,  ctl.addadminData);
route.get("/deleteData" , upload ,  ctl.deleteData);
route.get("/editData" , upload , ctl.editData);
route.post("/updateData" , upload , ctl.updateData);

module.exports = route;