const express = require("express");
const port = 1008;
const app = express();
const db = require("./config/db");
const cors = require("cors");
const session = require('express-session');

app.use(
    session({
    name: "local",
    secret: 'admin',
    resave: true,
    saveUninitialized: false,
  }))

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));

app.use("/", require("./routes/Admin route/route"));
app.use("/manager", require("./routes/Manager route/route"));
app.use("/employee", require("./routes/Employee route/route"));

app.listen(port, (err)=>{
    err ? console.log(err) : console.log("Server started on " + port);
})