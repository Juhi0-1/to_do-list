const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");



const app = express();
app.set('view engine', 'ejs');

// const staticPath = path.join(__dirname, "/index.html");
// app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({extended :true}));

var items = [];  
let workItems = [];

app.use(express.static("public"));  //ye hamne public folder ko app.ejs file me use krne ke liye kia tha


app.get("/" , (req,res)=>{
   var today = new Date();
   
   //ye options wala part date ko ek format m convert krne ke liye hota hai that method or say function is known as      toLocaleDatestring or jo bhi add krna ho just put it into options


   var options = {
    weekday : "long",
    day: "numeric",
    month : "long",

   };
   var day = today.toLocaleDateString("en-US", options);
 
   
   res.render('list', {listTitle: day, newListItems :items});
});

app.get("/about", (req,res)=>{
  res.render("about");
})


app.post("/" ,(req, res)=>{
     var item = req.body.newItem
     
     console.log(req.body.list);
     if(req.body.list === "Work List"){
      workItems.push(item);
      res.redirect("/work");
     }
     else{
      items.push(item);
      res.redirect("/");
     }


  
})




app.get("/work" ,(req, res)=>{
  res.render("list", {listTitle : "Work List", newListItems: workItems})
})


app.post("/work" , (req,res)=>{
   let item = req.body.newItem;
   workItems.push(item);
   req.redirect("/work");
})

app.listen(3000, ()=>{
    console.log("Port at 3000");
});