var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser"),
    mongoose  = require("mongoose");
    
    mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    
    
    
    var campgroundSchema = new mongoose.Schema({
        name: String,
        image: String,
        description:String
    });
    
    var Campground  = mongoose.model("Campground", campgroundSchema);
    
        /*Campground.create({name:"Tamil Naidu", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg", description: "Beautiful and immacuated city"}, function(err, camp){
           if(!err){
               console.log(camp);
           } 
        });
        */
    
    // Campground.remove({_id: "5be7fba97783c6165ee0dc7a"}, function(err, ca){
    //     if(!err){
    //         console.log("we have removed the"+ca);
    //     }
    // })
    
    
    
    
    app.get("/", function(req, res){
       res.render("landing"); 
    });
    
    
    app.get("/campground", function(req, res){
       
       Campground.find({}, function(err, cam){
          
          if(!err){
              console.log(cam);
              res.render("index", {campground: cam});
          }
           
       });
            
            
       
    });
    
    
    app.post("/campground", function(req, res){
        
        console.log(req.body);
        
        var newCamp = req.body;
       
        Campground.create(newCamp, function(err, camp){
               if(!err){
                   res.redirect("/campground");
               } 
             });
            
    });
    
    
    app.get("/campground/new", function(req, res){
       res.render("new"); 
    });
    
    
    app.get("/campground/:id", function(req, res){
         Campground.findById(req.params.id, function(err, cam){
             if(!err){
                 
                 res.render("show", {campground: cam});
             }
         })
    });
    
    
    
    
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server for YelpCamp is Started . Crtl+ C to Quit!!!");
    })