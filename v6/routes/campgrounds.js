
    //Campground 
    var express = require("express"),
     router = express.Router(),
    Campground = require("../models/campground");
    
    router.get("/", function(req, res){
       
       Campground.find({}, function(err, cam){
          
          if(!err){
              console.log(cam);
              res.render("index", {campground: cam,currentUser:req.user});
          }
           
       });
            
            
       
    });
    
    
    router.post("/", function(req, res){
        
        console.log(req.body);
        
        var newCamp = req.body;
       
        Campground.create(newCamp, function(err, camp){
               if(!err){
                   res.redirect("/campground");
               } 
             });
            
    });
    
    
    router.get("/new", function(req, res){
       res.render("new"); 
    });
    
    
    router.get("/:id", function(req, res){
         Campground.findById(req.params.id).populate("comments").exec(function(err, cam){
             if(!err){
                 console.log("**********");
                 console.log(cam);
                 res.render("show", {campground: cam});
             }
         })
    });
    
    
    module.exports = router;