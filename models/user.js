import { Long } from "bson";
import mongoose from "mongoose"; 
const {Schema,model} =mongoose;


const userSchema=new Schema(
    {   

        FirstName:{
            type:String         
        },
        LastName:{
            type:String          
        },
        BirthDate:{
            type:String
        },
        Gender:{
            type:String            
        },
        Country:{
            type:String            
        },
        Tel:{
            type:String,               
        },
        Email:{
            type:String
        },
        Password:{
            type:String 
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
            default:false,
            type:Boolean,
        },
        vString:{type:String}
        ,
        Token:{
            type:String
        },
        Patients:[{
            type: String
        }],
        Guardians:[{
            type: String
        }],
    
    },

    {
        timestamps:true
    }
);


const User = mongoose.model("user", userSchema);

export {User}; 
