import { Long } from "bson";
import mongoose from "mongoose"; 
const {Schema,model} =mongoose;


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

export default model("User",userSchema);