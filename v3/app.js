
var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser"),
    mongoose  = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDb = require("./seeds");
    
    seedDb();
    
    mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    
    
    
  
    
    
    
    
    
    
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
         Campground.findById(req.params.id).populate("comments").exec(function(err, cam){
             if(!err){
                 console.log("**********");
                 console.log(cam);
                 res.render("show", {campground: cam});
             }
         })
    });
    
    
    app.get("/campground/:id/comment/new", function(req, res){
        Campground.findById(req.params.id, function(err, camground){
            if(!err){
                res.render("comment", {camp : camground});
            }
        })
        
    })
    
    
    app.post("/campground/:id/comment", function(req, res){
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
    
    
    
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server for YelpCamp is Started . Crtl+ C to Quit!!!");
    })