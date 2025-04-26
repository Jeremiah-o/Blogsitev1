const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const _=require('lodash');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

const homeStartingContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.";
const aboutContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.";
const contactContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.";
const posts=[];

app.get('/',function(req,res){
    res.render('blog',{homeStartingContent:homeStartingContent,
    posts:posts});
});

app.get('/about',function(req,res){
    res.render('about',{aboutContent:aboutContent});
})

app.get('/contact',function(req,res){
    res.render('contact',{contactContent:contactContent});
})
app.get('/compose',function(req,res){
    res.render('compose');
    
});

app.get("/posts/:topic",function(req,res){
    posts.forEach(function(post) {
        const reqPost= _.lowerCase(req.params.topic)
        const avalPost=_.lowerCase(post.title)
        const postContent=post.content
        if(reqPost==avalPost){
            res.render('post',{postTitle:post.title ,postContent:post.content})
        }
    });
    
})

app.post("/compose",function(req,res){
    const post={
        title:req.body.title,
        content:req.body.content
    };
    posts.push(post);
    res.redirect("/");
});
app.listen(3300,function(){
    console.log("app is running on port 3300");
});