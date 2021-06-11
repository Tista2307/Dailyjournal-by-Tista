//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _=require("lodash")
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true,useUnifiedTopology: true})

const blogschema={
  title:String,
  post: String
}
const blogmodel=mongoose.model("dailyblog",blogschema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// arr.push({title:"Home",post:homeStartingContent})
const item1 = new blogmodel ({
  title:"Home",
  post:homeStartingContent
});
var arr = [item1];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  blogmodel.find({},function(err,fsome){
   if(fsome.length===0){
     blogmodel.insertMany(arr,function(err){
       if(err){
         console.log(err);
       }
       else{console.log("Done");}
     })
     res.redirect("/")
   }
   else{
     res.render("home",{arrs:fsome})
   }
  })
  
})   

app.get("/about",function(req,res){
  res.render("about",{abs:aboutContent})
}) 
app.get("/contacts",function(req,res){
  res.render("contact",{cons:contactContent})
}) 
app.get("/compose",function(req,res){
  res.render("compose")
}) 

app.post("/compose",function(req,res){
  var t=req.body.mytext;
  var ti=req.body.mytitle;
  var ob=new blogmodel({
   title:ti,
   post:t
  })

  ob.save()
  res.redirect("/")
})
app.get("/post/:topic",function(req,res){
  var top=req.params.topic
  blogmodel.findOne({title:top},function(e,foundone){
  if(!e){
    res.render("post",{titlep:foundone.title,postp:foundone.post});
  }

  })
   
 })
 app.post("/delete",function(req,res){
   var delt=req.body.postt;
   blogmodel.deleteMany({title:delt},function(e){
     if(e)console.log(e)
     else{console.log("deleted")}
   })
   res.redirect("/")
 })


app.listen(8080, function() {
  console.log("Server started on port 8080");
})













