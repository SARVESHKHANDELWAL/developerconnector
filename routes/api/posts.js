const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//load model 
const Post=require('../../models/Post');
const Profile=require('../../models/Profile');
const User=require('../../models/User');

//load validate
const validatePostInput = require('../../validation/post');

//@route GET api/post
//@desc Get posts
//@access Public
//so that the all post can be seen by all
router.get('/',(req,res)=>{
    Post.find()
        //importent to sort the post by DATE
        .sort({date:-1})
        .then(post =>res.json(post))
        .catch (err =>res.status(404).json(err));
});

//@route GET api/post/:id
//@desc Get posts by id
//@access Public

//so that the all post can be seen by all
//@here we use params to grab the id of that user which in url

router.get('/:id',(req,res)=>{
    //method to find it by id is important!
    Post.findById(req.params.id)
        .then(post =>res.json(post))
        .catch (err =>res.status(404).json({noprofile:'There is no such profile exist for this Id'}));
});


//@route POST api/post
//@desc Create Post
//@access Private(by passport)

 router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
 //validation 
const {errors,isValid}=validatePostInput(req.body);

//check validation
if(!isValid){
    return res.status(400).json(errors);
}

const newPost=new Post({
     text:req.body.text,
     name:req.body.name,
     avatar:req.body.avatar,
     user:req.user.id
 });
 newPost.save().then(post=>res.json(post));
 });

 //@route DELETE api/post/:id
//@desc Delete Post
//@access Private(by passport)

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({user:req.user.id})
.then(profile=>{
    Post.findById(req.params.id)
    .then(post=>{
    //Check for Post Owner
    //This User.id is not in The String we use toString() Method for this
    if(post.user.toString() !==req.user.id){
        //401-unauthorization 
        return res.status(401).json({noauthorization:'User not Authorized'});

    }
    //Delete
    post.remove().then(()=>res.json({success:true}));
})
.catch(err=>res.status(404).json({postnotfound:'No Post Found'}));
})
});

 //@route POST api/post/like/:id
//@desc like Post
//@access Private(by passport)

router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({user:req.user.id})
.then(profile=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({alreadyliked:'User already liked this post'});
        }
        //Add user id to likes array
        post.likes.unshift({user:req.user.id});

        //post save
        post.save().then(post=>res.json(post))
    
})
.catch(err=>res.status(404).json({postnotfound:'No Post Found'}));
})
});

//@route POST api/post/unlike/:id
//@desc unlike Post
//@access Private(by passport)

router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({user:req.user.id})
.then(profile=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length ===0){
            return res.status(400).json({notliked:'not liked yet the post'});
        }
                  //get remove index
                 const removeIndex=post.likes
                 .map(item=>item.user.toString())
                 .indexOf(req.user.id);


                 //splice out the array
                 //important method it remove from array
                 post.likes.splice(removeIndex,1);

  

        //post save
        post.save().then(post=>res.json(post))
    
})
.catch(err=>res.status(404).json({postnotfound:'No Post Found'}));
})
});

//@route POST api/post/comment/:id
//@desc Comment Post
//@access Private(by passport)

 router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
 //validation 
const {errors,isValid}=validatePostInput(req.body);

//check validation
if(!isValid){
    return res.status(400).json(errors);
}
Post.findById(req.params.id)
.then(post=>{
const newComment={
     text:req.body.text,
     name:req.body.name,
     avatar:req.body.avatar,
     user:req.user.id
 };
        //add to comment array
        post.comment.unshift(newComment);
        //save
        post.save().then(post=>res.json(post));
})
.catch(err=>res.status(404).json({postnotfound:'not found post'}))
});

//@route DELETE api/post/comment/:id
//@desc DELETE Comment Post
//@access Private(by passport)

 router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
 
Post.findById(req.params.id)
.then(post=>{
    //check to see if comment exists
    if(post.comment.filter(comment=>comment_id.toString()===req.params.comment_id).length===0){
        return res.status(404).json({commentnotexists:'comment does not exist'});

    }
     //get remove index
                 const removeIndex=post.comment
                 .map(item=>item._id.toString())
                 .indexOf(req.params.comment_id);


                 //splice out the array
                 //important method it remove from array
                 post.comment.splice(removeIndex,1);
         
        //post save
        post.save().then(post=>res.json(post))

       
})
.catch(err=>res.status(404).json({postnotfound:'not found post'}))
});

module.exports=router;