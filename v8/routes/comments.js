 //comment
 
 var express = require("express"),
     router = express.Router({mergeParams: true}),
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
                        comment.author._id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
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
    
    router.get("/:comment_id/edit",checkCommentOwnership, function(req, res){
      Comment.findById(req.params.comment_id, function(err, comment){
          if(err){
              res.redirect("back")
          }
          else{
              
              console.log("********");
              console.log(comment);
              console.log("********");
              console.log(req.params);
               res.render("commentEdit", {comment:comment, campg: req.params.id});
              
          }
         
      })
      
      
      
      
  });
    
    //
     router.put("/:comment_id",checkCommentOwnership, function(req, res){
      Comment.findByIdAndUpdate(req.params.comment_id, req.body, function(err, comment){
          if(!err){
              console.log(comment);
              res.redirect("/campground/"+req.params.id);
          }
      })
  });
  
  
  router.delete("/:comment_id",checkCommentOwnership, function(req, res){
      Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
          if(!err){
              console.log("Comment reomved");
                res.redirect("/campground/"+req.params.id);
              
          }
      })
  });
  
    function checkCommentOwnership(req, res, next){
          if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, comment){
           if(err){
               console.log(err);
               res.redirect("back");
           }
           else{
               console.log(comment);
               if(comment.author.username ===req.user.username){
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