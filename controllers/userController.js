import User from '../models/user.js';
import { validationResult } from 'express-validator';
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



export function getAll(req,res){
    User
    .find({})
    .then(docs=>{
        res.status(200).json(docs)
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
}

export function getById(req,res){
    User
    .findById(req.params.id)
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
}

export async function addOnce(req,res){
    if (!validationResult(req).isEmpty()){
        res.status(400).json({errors:validationResult(req).array()});
    }

    else{
        var EncryptedImgPath = CryptoJS.AES.
        encrypt(`${req.protocol}://${req.get('host')}${process.env.IMGURL}/${req.file.filename}`
        ,process.env.IMGKEY).toString();
        const EncryptedPassword = await bcrypt.hash(mdp, 10);
    User
    .create({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        BirthDate:req.body.BirthDate,
        Gender:req.body.Gender,
        Country:req.body.Country,
        Tel:req.body.Tel,
        Password:EncryptedPassword,
        Role:req.body.role,
        Email:req.body.Email, 
        ProfilePhoto:EncryptedImgPath,
        FaintsPerDay:req.body.FaintsPerDay,
        AgeWhenDiagnosed:req.body.AgeWhenDiagnosed,
        Location:req.body.Location
    })
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    } 
}

export function updateOnce(req,res){
    if (req.file) {
        var EncryptedImgPath = CryptoJS.AES.
        encrypt(`${req.protocol}://${req.get('host')}${process.env.IMGURL}/${req.file.filename}`
        ,process.env.IMGKEY).toString();
        User
        .findOneAndUpdate({"_id":req.params.id},{
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            BirthDate:req.body.BirthDate,
            Gender:req.body.Gender,
            Country:req.body.Country,
            Tel:req.body.Tel,
            Password:req.body.Password,
            Role:req.body.role,
            Email:req.body.Email, 
            ProfilePhoto:EncryptedImgPath,
            FaintsPerDay:req.body.FaintsPerDay,
            AgeWhenDiagnosed:req.body.AgeWhenDiagnosed,
            Location:req.body.Location
        })
        .then(docs=>{
    
         res.status(200).json(docs);
        })
        .catch(err=>{
         res.status(500).json({error:err});
     });
    }
    else { 
        User
        .findOneAndUpdate({"_id":req.params.id},{
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            BirthDate:req.body.BirthDate,
            Gender:req.body.Gender,
            Country:req.body.Country,
            Tel:req.body.Tel,
            Password:req.body.Password,
            Role:req.body.role,
            Email:req.body.Email,
            FaintsPerDay:req.body.FaintsPerDay,
            AgeWhenDiagnosed:req.body.AgeWhenDiagnosed,
            Location:req.body.Location
        })
        .then(docs=>{
    
         res.status(200).json(docs);
        })
        .catch(err=>{
         res.status(500).json({error:err});
     });
    }
   
    
}


export function deleteOnce(req,res){
    User
    .findOneAndRemove(req.params.id,req.body)
    .then(docs=>{
     res.status(200).json(docs);
    })
    .catch(err=>{
     res.status(500).json({error:err});
    });
}

export async function register (req,res){

    try {
    const {FirstName,LastName,Email,Password}=req.body;
    if (!(FirstName && LastName && Email && Password)) {
        res.status(400).send("All fields are required");
      }
    const oldUser = await User.findOne({ Email });
        if (oldUser) {
        return res.status(409).send("User already exists. Please Login");
        }
    const EncryptedPassword = await bcrypt.hash(Password, 10);
    const NewUser = await User.create({
        FirstName,
        LastName,
        Email: Email.toLowerCase(), 
        Password: EncryptedPassword,
        
      });
    const token = jwt.sign(
        { id: NewUser._id, Email},
        process.env.TOKENKEY,
        {
          expiresIn: "2h",
        }
      );
    NewUser.token = token;

    res.status(201).json(NewUser);
}
catch(err){
    console.log(err);
}
}

export async function login(req,res){

    try{
        const { Email, Password } = req.body;
        

        if (!(Email && Password)) {
            res.status(400).send("All fields are required");
          }
    
        const user = await User.findOne({ Email });
       

        if (user && (await bcrypt.compare(Password, user.Password))) {
            
            const token = jwt.sign(
              { id: user._id, Email },
              process.env.TOKENKEY,
              {
                expiresIn: "2h",
              }
            );
      
        
            user.token = token;
      
          
            res.status(200).json(user);
          }
          res.status(400).send("Invalid Credentials");

    }

    catch(err){
        console.log(err);
    }
}

