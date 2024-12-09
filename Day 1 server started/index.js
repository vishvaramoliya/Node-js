const http = require("http");
const port = 1008;

const handleport = (req , res)=>{
    res.write("<h1>Server Started</h1>");
    res.end();
};

const server = http.createServer(handleport);

server.listen(port , (err)=>{
    err ? console.log(err) : console.log("Server started on port : " + port);    
});