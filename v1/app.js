var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser");
    
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    
    
    
    var campgrounds = [
                     {name:"Kashmir", image: "https://farm6.staticflickr.com/5592/14940388216_2d72964061.jpg"},    
                     {name:"Himachal", image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg"},    
                     {name:"Tamil Naidu", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"},
                     {name:"Kashmir", image: "https://farm6.staticflickr.com/5592/14940388216_2d72964061.jpg"},    
                     {name:"Himachal", image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg"},    
                     {name:"Tamil Naidu", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"},
                     {name:"Kashmir", image: "https://farm6.staticflickr.com/5592/14940388216_2d72964061.jpg"},    
                     {name:"Himachal", image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg"},    
                     {name:"Tamil Naidu", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"}
            
            ];
    
    
    app.get("/", function(req, res){
       res.render("landing"); 
    });
    
    
    app.get("/campground", function(req, res){
       
       
            
            res.render("campground", {campground: campgrounds});
       
    });
    
    
    app.post("/campground", function(req, res){
        
        console.log(req.body);
        
        var newCamp = req.body;
        campgrounds.push(newCamp);
        res.redirect("/campground");
    });
    
    
    app.get("/campground/new", function(req, res){
       res.render("new"); 
    });
    
    
    
    
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Server for YelpCamp is Started . Crtl+ C to Quit!!!");
    })