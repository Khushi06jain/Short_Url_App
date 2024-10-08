const express=require("express");
const path=require("path");
const {connectToMongoDB}=require("./connect");
const urlRoutes= require("./routes/url");

const staticRoute=require("./routes/staticRouter")

const URL=require("./models/url");

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("mongodb connected"));


const app=express();
const PORT=8005;

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs");

app.set("views",path.resolve("./views"));

app.get("/test",async(req,res)=>{
    const allUrls=await URL.find({});
return res.render("home",{
    urls:allUrls,
});
});


app.use("/",staticRoute);
app.use("/url",urlRoutes);

app.get("/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }});
    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
      }
    
      res.redirect(entry.redirectURL);
    });
    
    
    
   



app.listen(PORT,()=>console.log(`server started at PORT: ${PORT}`));