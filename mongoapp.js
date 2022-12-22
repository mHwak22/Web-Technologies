//STEP --1-->import all the packeages in the app.js
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");


//STEP--2-->createing Promise
mongoose.Promise = global.Promise;
/*promise is a way to communicate with node and mongoose and it allow the asynchronous methods return values like 
to synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise 
supply the value at some point in the future.

it can be in three states :
--PENDING-> 
--FULLFILL->
-->REJECT->

it can be ethier in Fullfill state with value (data) or in rejected sate with a reason(err)
*/

//step --3--->Creating Connection with mongo
var url = "mongodb://0.0.0.0:27017//test";
//mngodb--- is the database name ...
//0.0.0.0--- is the server insted of this we can uose localhost..
//:27017---is the port number of mongodb
//test-- is the name of database inside the mongodb

//STEP--4-->CONNECTING WITH MONGO
mongoose.connect(url, {
    connectTimeoutMS: 1000
}, function (err, result) {
    if (err) {
        console.log(err);
        console.log("Error Occured")
    }
    else {
        console.log("Connection Done with DB")
    }
})

//STEP--5-->DECLARE MIDDLEWARE
app.use(bodyparser.json);
app.use(bodyparser.urlencoded, { extended: true })
app.use(express.static(path.join(__dirname, "public")))
app.use(function (req, resp, next) {
    resp.setHeader('Allow-conrol-Allow-origin', '*')
    resp.setHeader('Allow-control-Allow-Method', 'GET,POST,PUT,DELETE')
    resp.setHeader('Allow-control-Allow-Credentials', 'true')
    resp.setHeader('Allow-control-Allow-Hadder', 'Content-type')
    next();
})
/* CORS (Cross-Origin Resource Sharing) is system, consisting of transmitting headers(HTTP) that determines wherther browsers block
   frontend JavaScript code from accessing response for cross-origin requests
   --Allow-conrol-Allow-origin---->it indecates wheather the response can be shared,---->"*"-- is for all the paths ..instead of 
   "*" can give the paths of individual path
   --Aloow-conrol-Allow-Methods--->it Specifies the methods allowed when accessing the resource in response to a preflight request,
   -->mention the methods like Get,Post, Put,Delete,Options...etc.....
   --Allow-control-Allow-Credentials---->it indecates whether the response to the request can be exposed when the credentials flag is true
   --Allow-control-Allow-Hadder --->it is uesed in response to a PREFLIGHT REQUEST(it is an OPTIONS request, ussing 3 HTTP request header: 
    1.)Access-Control-Request-Method; 2.)Access-Control-Request-Headers;and 3.)the Origin header,..it is automatically issued by a browser and in normal 
    cases, front-end developers don't need to craft such requests tehmselve.)to indicate which HTTP headers can be used when making 
   the actual reuest 
   */

//STEP--6-->DEFINE ROUTES
app.use("/", routes)

//STEP--7-->DEFINE PORTNUMBER
app.listen(4000)
console.log("Server running at portnumber 4000")