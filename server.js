const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path = require('path');

//import the route
const posts=require('./routes/api/posts');
const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const passport=require('passport');
const app=express();
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//db connect
mongoose.connect("mongodb+srv://admin-sarvesh:Sarvesh@21@cluster0-ug5sl.mongodb.net/developerDB",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("server connected")).catch(err=>console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/posts',posts);
app.use('/api/profile',profile);
app.use('/api/users',users);

//Server static assets if in prodution
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    
    app.get('*',(res.req)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//app listen
app.listen('5000',()=>{
    console.log("server running on 5000.");
})
