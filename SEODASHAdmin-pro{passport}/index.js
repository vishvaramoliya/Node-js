const express = require("express");
const port = 2001;
const app = express();

const db = require("./config/db");
const path = require("path");
const cookie = require("cookie-parser");
const session = require("express-session");
const passport = require("./middlewere/passport");
// const passportlocal = require("passport-local");

app.use(session({
    name:"local",
    secret: 'rnw',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(cookie());
app.use(express.urlencoded());
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use("/uploads",express.static(path.join(__dirname ,'uploads')));


app.use("/" , require("./routes/route"));

app.listen(port , (err) =>{
    err ? console.log(err) : console.log("server started" + port);
});
