
var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser"),
    mongoose  = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDb = require("./seeds");
    
    seedDb();
    
    mongoose.connect("mongodb://localhost/yelp_camp_v5", { useNewUrlParser: true });
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname+"/public")) ;   
    
    
    //Passport Config
    
    app.use(require("express-session")({
        secret: "waheguru", 
        resave: false,
        saveUninitialized: false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        next();
    })
  
    
    
    
    
    
    
    app.get("/", function(req, res){
       res.render("landing"); 
    });
    
    
    app.get("/campground", function(req, res){
       
       Campground.find({}, function(err, cam){
          
          if(!err){
              console.log(cam);
              res.render("index", {campground: cam,currentUser:req.user});
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
    
    
    app.get("/campground/:id/comment/new",isLoggedIn,  function(req, res){
        Campground.findById(req.params.id, function(err, camground){
            if(!err){
                res.render("comment", {camp : camground});
            }
        })
        
    })
    
    
    app.post("/campground/:id/comment", isLoggedIn, function(req, res){
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
    
    //Auth routes
    
    app.get("/register", function(req, res){
        res.render("register");
    });
    
    app.post("/register", function(req, res){
        User.register(new User({username : req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                res.render("register");
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campground");
            })
        })
    })
    
    
    app.get("/login", function(req,res){
        res.render("login");
    });
    
    app.post("/login", passport.authenticate("local", {successRedirect: "/campground", failureRedirect: "/login"}), function(req, res){
        
    });
    
    app.get("/logout", function(req, res){
        req.logout();
        res.redirect("/campground");
    })
    
   function isLoggedIn(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }
       res.redirect("/login");
   }
    
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server for YelpCamp is Started . Crtl+ C to Quit!!!");
    })