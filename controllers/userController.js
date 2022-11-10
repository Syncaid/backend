import User from '../models/user.js';
import { validationResult } from 'express-validator';
import CryptoJS from 'crypto-js'





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

export function addOnce(req,res){
    if (!validationResult(req).isEmpty()){
        res.status(400).json({errors:validationResult(req).array()});
    }

    else{
        var EncryptedImgPath = CryptoJS.AES.
        encrypt(`${req.protocol}://${req.get('host')}${process.env.IMGURL}/${req.file.filename}`
        ,process.env.IMGKEY).toString();
    User
    .create({
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
