const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateProfileInput(data) {
    let errors={};
    //for empty fields in profile inputs
    
    data.handle =  !isEmpty(data.handle) ?  data.handle :   '' ;
    data.status =  !isEmpty(data.status) ?  data.status :   '' ;
    data.skills =  !isEmpty(data.skills) ?  data.skills :   '' ;

   
    //validate the length of handle 
    
    if(!Validator.isLength(data.handle,{min:2,max:40})){
        errors.handle='handle need to between 2 to 40 characters';
    }
    //for handle field is not empty
     if(Validator.isEmpty(data.handle)){
        errors.handle='profile handle is required';
    }
     //for status field is not empty
    if(Validator.isEmpty(data.status)){
        errors.status='status field is  required';
    }
      //for skills field is not empty
    if(Validator.isEmpty(data.skills)){
        errors.skills='skills field is required';
    }
    //for url formatted for website
     if(!isEmpty(data.website)){
       if(!Validator.notURL(data.website)){
           errors.website='Not a valid url';
       }
    }
    //youtube
    if(!isEmpty(data.youtube)){
       if(!Validator.notURL(data.youtube)){
           errors.youtube='Not a valid url';
       }
    }
    //twitter
    if(!isEmpty(data.twitter)){
       if(!Validator.notURL(data.twitter)){
           errors.twitter='Not a valid url';
       }
    }
    //facebook
    if(!isEmpty(data.facebook)){
       if(!Validator.notURL(data.facebook)){
           errors.facebook='Not a valid url';
       }
    }
    //linkdin
    if(!isEmpty(data.linkdin)){
       if(!Validator.notURL(data.linkdin)){
           errors.linkdin='Not a valid url';
       }
    }
    //instagram
    if(!isEmpty(data.instagram)){
       if(!Validator.notURL(data.instagram)){
           errors.instagram='Not a valid url';
       }
    }

     
     
    
   return{
       errors:errors,
       isValid:isEmpty(errors)
   } 
}