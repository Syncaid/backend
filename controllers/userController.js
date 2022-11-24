import { User } from '../models/user.js'; // add validate
import verificationEmail from "../utils/verificationEmail.js";
import passwordEmail from "../utils/passwordEmail.js"
import Token from '../models/emailtoken.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import bcrypt from 'bcryptjs';




export function getAll(req, res) {
  User
    .find({})
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export function getById(req, res) {
  User
    .findById(req.params.id)
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function addOnce(req, res) {



 //  var EncryptedImgPath = CryptoJS.AES.
  //   encrypt(`${req.protocol}://${req.get('host')}${process.env.IMGURL}/${req.file.filename}`
    //  , process.env.IMGKEY).toString();
    const EncryptedPassword = await bcrypt.hash(req.body.Password, 10);
    User
      .create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        BirthDate: req.body.BirthDate,
        Gender: req.body.Gender,
        Country: req.body.Country,
        Tel: req.body.Tel,
        Password: EncryptedPassword,
        Role: req.body.Role,
        Verified: req.body.Verified,
        Email: req.body.Email,
    //     ProfilePhoto: EncryptedImgPath,
        FaintsPerDay: req.body.FaintsPerDay,
        AgeWhenDiagnosed: req.body.AgeWhenDiagnosed,
        Location: req.body.Location
      })
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  
}

export async function updatePassword(req, res) {

 
  const EncryptedPassword = await bcrypt.hash(req.body.Password, 10);
  await User.findOneAndUpdate({ "_id": req.params.id }, {
    Password: EncryptedPassword
  }).then(docs => {
    res.status(200).json(docs);
  })
    .catch(err => {
      res.status(500).json({ error: err });
    });

}

export async function updateOnce(req, res) {
  
  if (req.file) {

    var EncryptedImgPath = CryptoJS.AES.
      encrypt(`${req.protocol}://${req.get('host')}${process.env.IMGURL}/${req.file.filename}`
        , process.env.IMGKEY).toString();
    User.findOneAndUpdate({ "_id": req.params.id }, {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      BirthDate: req.body.BirthDate,
      Gender: req.body.Gender,
      Country: req.body.Country,
      Tel: req.body.Tel,
      Role: req.body.role,
      Email: req.body.Email,
      ProfilePhoto: EncryptedImgPath,
      FaintsPerDay: req.body.FaintsPerDay,
      AgeWhenDiagnosed: req.body.AgeWhenDiagnosed,
      Location: req.body.Location,
      Guardians: req.body.Guardians,
      Patients: req.body.Patients
    })
      .then(docs => {

        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
  else {
    User
      .findOneAndUpdate({ "_id": req.params.ID }, {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        BirthDate: req.body.BirthDate,
        Gender: req.body.Gender,
        Country: req.body.Country,
        Tel: req.body.Tel,
        Role: req.body.Role,
        Email: req.body.Email,
        FaintsPerDay: req.body.FaintsPerDay,
        AgeWhenDiagnosed: req.body.AgeWhenDiagnosed,
        Location: req.body.Location,
        Guardians: req.body.Guardians,
        Patients: req.body.Patients

      })
      .then(docs => {

        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({ error: err });
        console.log(err)
      });
  }


}

export function deleteOnce(req, res) {
  User
    .findOneAndRemove(req.params.id, req.body)
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}




