 //comment
 
 var express = require("express"),
     router = express.Router(),
     Campground = require("../models/campground"),
     Comment = require("../models/comment");
 
 
    router.get("/new",isLoggedIn,  function(req, res){
        Campground.findById(req.params.id, function(err, camground){
            if(!err){
                res.render("comment", {camp : camground});
            }
        })
        
    })
    
    
    router.post("/", isLoggedIn, function(req, res){
        Campground.findById(req.params.id, function(err, camground){
            if(!err){
                Comment.create(req.body, function(err, comment){
                    if(!err)
                    {
                        camground.comments.push(comment);
                        camground.save(function(err, done){
                            if(!err){
                                res.redirect("/campground/"+req.params.id)
                            }
                        })
                        
                    }
                })
            }
        })
        
    })
    
    
 function isLoggedIn(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }
       res.redirect("/login");
   }
   
    module.exports = router;