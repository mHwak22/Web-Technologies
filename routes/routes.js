//STEP--1-->Import all required packages
var express = require("express");
var mongoose = require("mongoose");
var schemas = mongoose.schemas;
var router = mongoose.Routers();

//STEP--2--> Creating Schema 
/* Schema is the structure of the datebase  */
var prodSchema = schemas({

    pid: "String",
    pname: "String",
    pprice: "String"
});

//STEP--3-->CREATING MODEL
var product = mongoose.modelNames("prodTable", prodSchema, "prdTable")

//STEP--4-->CREATE ROUTES
router.get("/", function (req, resp) {
    //GET is the a method 
    product.find().exec(function (err, data) {
        if (data) {
            resp.status(500).send("no data found")
        }
        else {
            resp.send(data)
        }
    })
});

router.post("/list", function (req, resp) {
    var prodob = new product({ pid: req.body.pid, pname: req.body.pname, pprice: req.body.pprice })
    prodob.save(function (err, data) {
        if (err) {
            console.log(err);
            resp.status(500).send("no Data found")
        }
        else {
            console.log(data);
            resp.send(data)
        }
    })
});

//update
router.put("/product/:pip", function (req, resp) {
    console.log(req.body);
    product.findOne({ pip: req.body.pip }, function (err, doc) {
        if(err){
        resp.status(500).send("no data updated");
    }
    else {
            console.log("in else")
            doc.pip=req.body.pip;
            doc.pname=req.body.pname;
            doc.pprice=req.body.pprice;
            doc.save(function(err, data){
                if(err){
                    console.log(err);
                    resp.status(500).send("no data updates")
                }
                else{
                    resp.send(data)
                }
            })
        }})
});

//delete
router.delete("/product/:pip", function(req, resp){
    console.log(req.params);
    product.remove({pip:req.params.pip},function(err,doc){
        if(err){
            resp.status(500).send("no data found")
        }
        resp.status(200).send("data deleted successfully");
    });
});

module.exports=router;