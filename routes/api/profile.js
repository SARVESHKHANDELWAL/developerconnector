const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');


//load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//load profile model
const Profile=require('../../models/Profile');

//load user model
const User=require('../../models/User');


router.get('/test',(req,res)=>res.json({ msg: 'profile works'}));

//below route is protected route
//by passport.authenticate('jwt',{session:false})

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
 const errors={};
  Profile.findOne({user:req.user.id})
  .populate('user',['name','avatar'])
  .then( profile=>{
      if(!profile){
          errors.noprofile='No profile for this User'
          return res.status(404).json(errors);
      }
      res.json(profile);
      
  })
  .catch(err =>res.status(404).json(err));
});

//@route GET  api/profile/all
//@desc Get all profiles
//@access Public 
//@here params will grab the :handle url of present handle

router.get('/all',(req,res)=>{
Profile.find()
.populate('user',['name','avatar'])
.then(profiles=>{
 if(!profiles){
     errors.noprofile='There is no profile for this user'
     return res.status(404).json(errors);
     }
     res.json(profiles);
})
 .catch(err => res.status(404).json({profile:'There is no profile '})
    );
}); 





//@route GET  api/profile/handle/:handle
//@desc Get profile by handle
//@access Public (can be seen by any one)
//@here params will grab the :handle url of present handle
router.get('/handle/:handle',(req,res)=>{
    const errors={};
    Profile.findOne({ handle: req.params.handle })
    .populate('user',['name','avatar'])
    .then(profile =>{
        if(!profile){
        errors.noprofile='There  is not for this user';
        return res.status(404).json(errors);
        }
        res.json(profile); 
    })
    .catch(err => res.status(404).json({profile:'There is no profile for this user'}));
});
//@route GET  api/profile/user/:user_id
//@desc Get profile by user
//@access Public (can be seen by any one)
//@here params will grab the :handle url of present handle
router.get('/user/:user_id',(req,res)=>{
    const errors={};
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar'])
    .then(profile =>{
        if(!profile){
        errors.noprofile='There  is not for this user';
        return res.status(404).json(errors);
        }
        res.json(profile); 
    })
    .catch(err => res.status(404).json({profile:'There is no profile for this user'})
    );
});





//@route POST api/profile
//@desc Create or Edit user profile
//@access Private(by passport)

 router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
 //validation 
const {errors,isValid}=validateProfileInput(req.body);

//check validation
if(!isValid){
    return res.status(400).json(errors);
}
 
 //get fields

 const profileFields={};
 profileFields.user=req.user.id;
 if(req.body.handle){
     profileFields.handle=req.body.handle;
 }
 if(req.body.company){
     profileFields.company=req.body.company;
 }
 if(req.body.website){
     profileFields.website=req.body.website;
 }
 if(req.body.location){
     profileFields.location=req.body.location;
 }
 if(req.body.status){
     profileFields.status=req.body.status;
 }
 if(req.body.githubusername){
     profileFields.githubusername=req.body.githubusername;
 }
 //Skills -Split into
 if(typeof req.body.skills !== 'undefined'){
     profileFields.skills=req.body.skills.split(',');
 }
 //Social
 profileFields.social={};
 if(req.body.youtube){
   profileFields.social=req.body.youtube;
 }
 if(req.body.twitter){
   profileFields.social=req.body.twitter;
 }
 if(req.body.facebook){
   profileFields.social=req.body.facebook;
 }
 if(req.body.linkdin){
   profileFields.social=req.body.linkdin;
 }
 if(req.body.instagram){
   profileFields.social=req.body.instagram;
 }

 Profile.findOne({user:req.body.id})
 .then(profile=>{
     if(profile){
         //update
         Profile.findOneAndUpdate(
             {user:req.body.id},
             {$set:profileFields},
             {new:true}
             )
             .then(profile=> res.json(profile))
     }
     else{
         //create

         //check if handle exist
         Profile.findOne({handle:req.body.handle}).then(profile =>
         {
             if(profile)
             {
                 errors.handle='That handle already Exists';
                 return res.status(400).json(errors);
             }
             //save profile
             new Profile(profileFields).save()
         });
     }
 });
});
//@route post  api/profile/experience
//@desc Add Experience to the profile
//@access Private
router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{

//validation 
const {errors,isValid}=validateExperienceInput(req.body);

//check validation
if(!isValid){
    return res.status(400).json(errors);
}

Profile.findOne({user:req.user.id})
.then(profile=>{
const newexp={
    title:req.body.title,
    company:req.body.company,
    location:req.body.location,
    from:req.body.from,
    to:req.body.to,
    current:req.body.current,
    description:req.body.description
}
//Add to exp array
/*If we use push method to add to array 
it will be added in end instead of that we use unshift method */
    profile.experience.unshift(newexp);
//save this profile
    profile.save().then(profile=>res.json(profile));
  })
});


//@route post  api/profile/education
//@desc Add Education to the profile
//@access Private
router.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{

//validation 
const {errors,isValid}=validateEducationInput(req.body);

//check validation
if(!isValid){
    return res.status(400).json(errors);
}

Profile.findOne({user:req.user.id})
.then(profile=>{
    //error is const newedu=new Profile({});
    //do see it later
const newedu={
    school:req.body.school,
    degree:req.body.degree,
    fieldofstudy:req.body.fieldofstudy,
    from:req.body.from,
    to:req.body.to,
    current:req.body.current,
    description:req.body.description
}
//Add to exp array
/*If we use push method to add to array 
it will be added in end instead of that we use unshift method */
    profile.education.unshift(newedu);
//save this profile
    profile.save()
    .then(profile =>res.json(profile))
    
  })
  .catch(err=>res.json(err));
});

//@route DELETE  api/profile/education/:exp_id
//@desc Delete experience from profile
//@access Private
router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{



Profile.findOne({user:req.user.id})
.then(profile=>{
 //get remove index
 const removeIndex=profile.education
 .map(item=>item.id)
 .indexOf(req.params.edu_id);


 //splice out the array
 //important method it remove from array
 profile.education.splice(removeIndex,1);

//save 
profile.save()
.then(profile=>res.json(profile))

  })
.catch(err=>res.status(404).json(err));
});


//@route DELETE  api/profile/education/:exp_id
//@desc Delete experience from profile
//@access Private
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{



Profile.findOne({user:req.user.id})
.then(profile =>{
 //get remove index
 const removeIndex=profile.experience
 .map(item =>item.id)
 .indexOf(req.params.exp_id);


 //splice out the array
 //important method it remove from array
 profile.experience.splice(removeIndex,1);

//save 
profile.save()
.then(profile=> res.json(profile))
})
.catch(err=> res.status(404).json(err));
});

//@route DELETE  api/profile
//@desc Delete user and profile
//@access Private
router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOneAndRemove({user:req.user.id}).then(()=>{
    User.findOneAndRemove({_id:req.user.id}).then(()=>
    res.json({success:true})
    );
})
});

module.exports=router;