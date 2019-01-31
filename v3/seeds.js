var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name : " Sunshine",
    image: "https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f50a3776b0916ec81eac3ab6fc2d514c&auto=format&fit=crop&w=500&q=60",
    description: "Wahahahahhahahha Wahahahhahahahha"
},

{
    name : " Get together",
    image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=891fe858de061305b9d58986c3970d60&auto=format&fit=crop&w=500&q=60",
    description: "UFFFFffffffff"
},
{
    name : " Lite the fire",
    image: "https://images.unsplash.com/photo-1533086723868-6060511e4168?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ab5a4254f8f74757f21a1950bf83460f&auto=format&fit=crop&w=500&q=60",
    description: "Hotttttttt"
}

]

function seedDb(){
   //removing Campgrounds
   Campground.remove({}, function(err, camp){
    if(!err){
        console.log(camp);
         data.forEach(function(seed){
       Campground.create(seed, function(err, camp){
           if(!err){
               console.log(camp);
               Comment.create({
                   text: "This place is ausome",
                   author: "saitej" 
               }, function(err, comment){
                   if(!err){
                      camp.comments.push(comment);
                      camp.save(function(err, done){
                       if(!err){
                           console.log(done);
                       }
                   }) 
                       
                   }
                   
               })
           }
       })
   })
   
    

    }
}); 

//Adding new campgrounds
  
    
}


module.exports = seedDb;