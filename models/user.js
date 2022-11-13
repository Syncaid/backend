import { Long } from "bson";
import mongoose from "mongoose"; 
const {Schema,model} =mongoose;
import Joi from 'joi'


const userSchema=new Schema(
    {
        FirstName:{
            type:String,          
        },
        LastName:{
            type:String          
        },
        BirthDate:{
            type:Date
        },
        Gender:{
            type:String            
        },
        Country:{
            type:String            
        },
        Tel:{
            type:String,
            minlength:8,
            maxlength:8      
        },
        Email:{
            type:String,
        },
        Password:{
            type:String,
            
        },
        Role:{
            type:String
        },
        ProfilePhoto:{
            type:String
        },
        FaintsPerDay:{
            type:String
        },
        AgeWhenDiagnosed:{
            type:String
        },
        Location:{
            type:String
        }, 
        Verified:{
            type:Boolean,
            default:false
        },
        VString:{
            type:String,
        },
        token:{
            type:String
        }
        
    
    },

    {
        timestamps:true
    }
);

const validate = (user) => {
    const schema = Joi.object({
      FirstName: Joi.string().min(3).max(255).required(),
      Email: Joi.string().email().required(),
    });
    return schema.validate(user);
  };

const User = mongoose.model("user", userSchema);

export {User, validate};