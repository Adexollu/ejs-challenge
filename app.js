const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const homeStartingContent = "As a motivated Software Engineer, I thrive on challenges and take pride in crafting user-friendly digital experiences. My proficiency in various web development tools and techniques enables me to deliver top-notch solutions. I am eager to contribute my expertise to a forward-thinking team that values innovation and collaboration, where I can actively shape exciting new projects."
const aboutContent = "As a motivated Software Engineer, I thrive on challenges and take pride in crafting user-friendly digital experiences. My proficiency in various web development tools and techniques enables me to deliver top-notch solutions. I am eager to contribute my expertise to a forward-thinking team that values innovation and collaboration, where I can actively shape exciting new projects."
const contactContent = "Lagos, Nigeria: obidokunadeolu@gmail.com || 08104147806 || 09059664633 || GitHub || LinkedIn"




app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


let posts = [];

app.get("/", function(req, res){
    res.render('home', {
        startingContent: homeStartingContent, 
        posts: posts
    });

})

app.get("/about", function(req, res){
    res.render('about', {aboutContent: aboutContent});
})

app.get("/contact", function(req, res){
    res.render('contact', {contactContent: contactContent});
})

app.get("/compose", function(req, res){
    res.render('compose');
    
})

app.post("/compose", function(req, res){
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
 posts.push(post);
 
    res.redirect('/')
})

app.get("/posts/:postName", function(req, res){
    const a = req.params.postName;

    posts.forEach(function(post){
        const b = post.title;
        if (a === b) {
        res.render('post', {
            title: post.title,
            content: post.content
        })
        }  

    })
    
})


app.listen(3000, function(){
    console.log("Server is running on port 3000")
})
