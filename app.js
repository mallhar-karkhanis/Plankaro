const express=require("express");

const app=express();

const mongoose=require("mongoose");

const path=require("path");



app.use(express.urlencoded({extended:true}));

const ejsMate=require("ejs-mate");


const methodOverride=require("method-override");
app.use(methodOverride("_method"));



app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));










const Listing=require("/Users/malharkarkhanis/Desktop/MajorProject AC2/models/listing.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));




let port =8080;

main().then(()=>{

    console.log("connected to DB");


}).catch(err=>{
    console.log(err);
});

async function main(){

    await mongoose.connect("mongodb://127.0.0.1:27017/venturevista");
}

/*app.get("/testListing",async(req,res)=>{

    let sampleListing=new Listing({

        title:"My new Villa",
        description:"By the beach",
        price:1200,
        location:"Calangute,Goa",
        country:"India",



    });

  

    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful testing");



});*/


//Index Route





app.get("/listings",async(req,res)=>{


   const allListings= await Listing.find({});
   res.render("/Users/malharkarkhanis/Desktop/MajorProject AC2/views/listings/index.ejs",{allListings});
        

});
//new Route
app.get("/listings/new",(req,res)=>{

    res.render("/Users/malharkarkhanis/Desktop/MajorProject AC2/views/listings/new.ejs");

})

//Show Route

app.get("/listings/:id",async (req,res)=>{


    let {id}=req.params;
   const listing= await Listing.findById(id);
   res.render("/Users/malharkarkhanis/Desktop/MajorProject AC2/views/listings/show.ejs",{listing})







});





//Create New Route

app.post("/listings",async(req,res)=>{

   
    const NewListing= new Listing(req.body.listing);
 
    await NewListing.save();
 
    res.redirect("/listings");
 
     
 });
 
 
 
     //Edit Route
 
     app.get("/listings/:id/edit",async(req,res)=>{
 
 
         let {id}=req.params;
 
         const listing=await Listing.findById(id);
 
         res.render("/Users/malharkarkhanis/Desktop/MajorProject AC2/views/listings/edit.ejs",{listing});
 
     
 
     });

     //Update Route

    // Update Route


    app.put("/listings/:id",async(req,res)=>{

        let{id}=req.params;

       await Listing.findByIdAndUpdate(id,{...req.body.listing});

        res.redirect(`/listings/${id}`);
    });

    //DELETE ROUTE

    app.delete("/listings/:id",async(req,res)=>{

        let {id}=req.params;
        let deletedListing=await Listing.findByIdAndDelete(id);

        console.log(deletedListing);
        res.redirect("/listings");


    })

 






app.get("/",(req,res)=>{
    console.log("Hi i am root");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});