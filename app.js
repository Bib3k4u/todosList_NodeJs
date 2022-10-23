const express = require('express');
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
let items =["Eat", "Code", "Sleep"];
let workItems=["kaam", "karo", "re"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    let day=date();
    res.render("index",{listTitle:day,newlistItems:items});
});

app.post("/", function(req,res){
    let item = req.body.newItem;
    
    if(req.body.newItem==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("index", {listTitle:"Work List", newlistItems:workItems})
});

app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000, function(){
    console.log(`Listening on port http://localhost:3000`)
})