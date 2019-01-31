var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name : " Sunshine",
    image: "https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f50a3776b0916ec81eac3ab6fc2d514c&auto=format&fit=crop&w=500&q=60",
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,, comes from a line in section 1.10.32."
},

{
    name : " Get together",
    image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=891fe858de061305b9d58986c3970d60&auto=format&fit=crop&w=500&q=60",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
},
{
    name : " Lite the fire",
    image: "https://images.unsplash.com/photo-1533086723868-6060511e4168?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ab5a4254f8f74757f21a1950bf83460f&auto=format&fit=crop&w=500&q=60",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
}

]

function seedDb(){
   //removing Campgrounds
   Campground.remove({}, function(err, camp){
       if(err){
           console.log(err);
       }
  /*  if(!err){
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
   
    

    }*/
}); 

//Adding new campgrounds
  
    
}


module.exports = seedDb;