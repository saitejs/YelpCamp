
    //Campground 
    var express = require("express"),
     router = express.Router({mergeParams: true}),
    Campground = require("../models/campground");
    
    router.get("/", function(req, res){
       
       Campground.find({}, function(err, cam){
          
          if(!err){
              console.log(cam);
              res.render("index", {campground: cam,currentUser:req.user});
          }
           
       });
            
            
       
    });
    
    
    router.post("/",isLoggedIn, function(req, res){
        
        console.log(req.body);
        
        var newCamp = req.body;
       console.log(req.body)
        Campground.create(newCamp, function(err, camp){
               if(!err){
                   camp.author.id = req.user._id;
                   camp.author.username = req.user.username;
                   camp.save();
                   console.log(camp);
                   res.redirect("/campground");
               } 
             });
            
    });
    
    
    router.get("/new",isLoggedIn, function(req, res){
       res.render("new"); 
    });
    
    
    router.get("/:id", function(req, res){
     
         Campground.findById(req.params.id).populate("comments").exec(function(err, cam){
             if(!err){
                 console.log("**********");
                 console.log(cam);
                 res.render("show", {campground: cam, });
             }
         })
    });
    
     router.get("/:id/edit",checkCampgroundOwnership,  function(req, res){
       
           Campground.findById(req.params.id, function(err, camp){
               if(!err){
                   res.render("edit", {campground: camp});
               }
                  
             });
             
   });
   
   
   router.put("/:id",checkCampgroundOwnership, function(req, res){
       
      
       Campground.findByIdAndUpdate(req.params.id, req.body, function(err, update){
           if(err){
               console.log(err);
           }
           else{
               res.redirect("/campground/"+req.params.id);
           }
       })
       
   })
   
   
   router.delete("/:id",checkCampgroundOwnership, function(req, res){
       
      
       Campground.findByIdAndRemove(req.params.id, function(err, update){
           if(err){
               console.log(err);
           }
           else{
               res.redirect("/");
           }
       })
       
   });
   
   
   function checkCampgroundOwnership(req, res, next){
          if(req.isAuthenticated()){
           Campground.findById(req.params.id, function(err, camp){
           if(err){
               console.log(err);
               res.redirect("back");
           }
           else{
               console.log(camp);
               if(camp.author.id.equals(req.user.id)){
                   next();
               }else{
                   res.redirect("back");
               }
               
           }
       });
           
       }else{
           
           res.redirect("back");
       }
   }
   
   
    
     function isLoggedIn(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }
       req.flash("error", "Please login first!!");
       res.redirect("/login");
   }
    
    module.exports = router;