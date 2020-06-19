const express=require('express');
const router=express.Router();
const gravatar = require('gravatar');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const passport=require('passport');

//load validation model of register
const validateRegisterInput = require('../../validation/register');
//load validation model of login
const validateLoginInput = require('../../validation/login');
//load user model
const User=require('../../models/User');

router.get('/test',(req,res)=>res.json({msg: 'users works'}));

router.post('/register',(req,res)=>{
//validation 
const {errors,isValid}=validateRegisterInput(req.body);

//check validation
if(!isValid){
    return res.status(400).json(errors);
}
    User.findOne({email:req.body.number}).then(user =>{
        if(user)
        {
         errors.email='Email already exists!';
         return res.status(400).json(errors);
        }
      
        else
        {
        const avatar=gravatar.url(req.body.email,{
        s:'200',//size
        r:'pg',//Rating
        d:'mm' //Default
        })
        
        const newUser= new User({
         name:req.body.name,
         email:req.body.email,
         avatar,
         password:req.body.password
        });
        
        bcrypt.genSalt(10,(err,salt)=>
        {
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
             if(err){
                 console.log(err);
             }
           
             newUser.password=hash;
             newUser.save()    
             .then(user => res.json(user))
             .catch(err => console.log(err));
             });
             });
        
        }        
});
});
router.post('/login',(req,res)=>{
//validation 
const {errors,isValid}=validateLoginInput(req.body);

//check validation
if(!isValid){
    return res.status(400).json(errors);
}
    const email=req.body.email;
    const password=req.body.password;
    //find user by email 
    User.findOne({email}).then(user=>{
        //check the user
        if(!user)
        {
            errors.email='user not found';
            return res.status(404).json(errors);
        }

        //check password
        bcrypt.compare(password,user.password).then(isMatch =>{
            if(isMatch)
            {
               //user matches
               const payload={id:user.id,name:user.name,avatar:user.avatar};//create JWT payload

               //sign token
               secretOrKey='secret';
               jwt.sign(
                   payload,secretOrKey,{expiresIn:7200},
                   (err,token)=>{
                       res.json({
                           success:true,
                           token:' bearer ' + token
                       })
                   }

               )
            }
            else
            {
                errors.password='password incorrect';
               return res.status(400).json(errors);
            }
        });
    });
});
//private route
router.get('/current',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    });
});

module.exports= router;