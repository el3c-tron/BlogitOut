const express = require("express");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const auth = require("./middleware/auth");
const {getBlogs} = require("./controllers/blogController");
const port = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/Blog")
    .then( ()=>{
        console.log("Connetion Estabilished");
    } ).catch( (err)=>{
        console.log("Access Denied",err);
    } );









app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine" , "ejs");
app.use("/user" , userRouter);
app.use("/blog" , blogRouter);
app.use(express.json({limit:'1mb'}));









app.get("/" , auth , async (req , res) => {

    const blogs = await getBlogs();
    // console.log(blogs);

    if(req.isLoggedIn){
        res.render("home" , {isLoggedIn:req.isLoggedIn , user:req.LoggedInUser , blogs:blogs});
    }
    else{
        res.render("home" , {isLoggedIn:req.isLoggedIn , blogs:blogs});
    }

});

app.get("/aboutUs" , auth , (req , res) =>{
    res.render("AboutUs" , {isLoggedIn:req.isLoggedIn , user:req.LoggedInUser});
})

app.get("/team" , auth , (req , res) =>{
    res.render("Team" , {isLoggedIn:req.isLoggedIn , user:req.LoggedInUser});
})

app.get("/feedback" , auth , (req , res) =>{
    res.render("Feedback" , {isLoggedIn:req.isLoggedIn , user:req.LoggedInUser});
})











app.listen(port , ()=>{
    console.log("Server Started on Port " + port);

});
