
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
    
    var commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes = require("./routes/index");
        
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
  
   app.use("/",indexRoutes);
   app.use("/campground",campgroundRoutes);
   app.use("/campground/:id/comment",commentRoutes);
    
   app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server for YelpCamp is Started . Crtl+ C to Quit!!!");
    })