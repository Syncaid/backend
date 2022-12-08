import { User } from "../models/user.js"; // add validate
import verificationEmail from "../utils/verificationEmail.js";
import passwordEmail from "../utils/passwordEmail.js";
import Token from "../models/emailtoken.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export function getAll(req, res) {
  User.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getGuardians(req, res) {
  
  User.findById(req.params.id)
    .then(async (docs) => {
       var guardians = [];
       for (const item of docs.Guardians)  {
      
       let guardian = await User.findById(item._id);
       guardians.push(guardian); 
      
       }
      res.status(200).json(guardians);
    })
    
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function getPatients(req, res) {
  
  User.findById(req.params.id)
    .then(async (docs) => {
       var guardians = [];
       for (const item of docs.Patients)  {
      
       let patient = await User.findById(item._id);
       patients.push(patient); 
      
      }
      res.status(200).json(patients);
    })
    
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function addGuardian(req, res) {
  
  let Guardian = await User.findOne({Email: req.body.Email})
  
 if (Guardian) {
  
  await User.findOne({ _id: req.params.id })
    .then(async (docs) => {
      
      var guardians = docs.Guardians;
      var found = guardians.find(element => element._id.equals(Guardian._id));
      if(found == null) { 
      guardians.push(Guardian._id);
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          Guardians: guardians,
        }
      )
        .then((docs) => {
          res.status(200).json(docs);
        })
        .catch((err) => {
          res.status(500).json("Cant add guardian");
        });
    }
        else { 
          res.status(500).json("Already user's guardian")
        }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  
   
}
else { 
  res.status(404).json("Unexsitant user to add as guardian")
}
}

export async function addPatient(req, res) {
  
  let Patient = await User.findOne({Email: req.body.Email})
  
 if (Patient) {
  
  await User.findOne({ _id: req.params.id })
    .then(async (docs) => {
     
      var patients = docs.Patients; 
      var found = patients.find(element => element._id.equals(Patient._id));
      if(found == null) { 
      patients.push(Patient._id);
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          Patients: patients,
        }
      )
        .then((docs) => {
          res.status(200).json(docs);
        })
        .catch((err) => {
          res.status(500).json("Cant add patient");
        });
      }
      else { 
        res.status(500).json("Already user's guardian")
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
else { 
  res.status(404).json("Unexsitant user to add as patient")
}
}

export async function deleteGuardian(req, res) {
  
  let Guardian = await User.findOne({_id: req.body.id})
  
 if (Guardian) {
  
  await User.findOne({ _id: req.params.id })
    .then(async (docs) => {
      
      var guardians = docs.Guardians;
      const index = guardians.findIndex(element => element._id.equals(Guardian._id));
      if(index != null) { 
      guardians.splice(index,1)
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          Guardians: guardians,
        }
      )
        .then((docs) => {
          res.status(200).json(docs);
        })
        .catch((err) => {
          res.status(500).json("Cant delete guardian");
        });
    }
        else { 
          res.status(500).json("Guardian not assigned as guardian")
        }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  
   
}
else { 
  res.status(404).json("Guardian user not found")
}
}

export async function deletePatient(req, res) {
  
  let Patient = await User.findOne({_id: req.body.id})
  
 if (Patient) {
  
  await User.findOne({ _id: req.params.id })
    .then(async (docs) => {
      
      var patients = docs.Patients;
      const index = patients.findIndex(element => element._id.equals(Patient._id));
      if(index != null) { 
      patients.splice(index,1)
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          Patients: patients,
        }
      )
        .then((docs) => {
          res.status(200).json(docs);
        })
        .catch((err) => {
          res.status(500).json("Cant delete patient");
        });
    }
        else { 
          res.status(500).json("Patient user exists but is not assigned as patient")
        }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  
   
}
else { 
  res.status(404).json("Patient user not found")
}
}

export function getById(req, res) {
  User.findById(req.params.id)
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function addOnce(req, res) {
  //  var EncryptedImgPath = CryptoJS.AES.
  //   encrypt(`${req.protocol}://${req.get('host')}${process.env.IMGURL}/${req.file.filename}`
  //  , process.env.IMGKEY).toString();
  const EncryptedPassword = await bcrypt.hash(req.body.Password, 10);
  User.create({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Age: req.body.Age,
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
    Location: req.body.Location,
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function updatePassword(req, res) {
  const EncryptedPassword = await bcrypt.hash(req.body.Password, 10);
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      Password: EncryptedPassword,
    }
  )
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function updateOnce(req, res) {
  if (req.file) {
    var EncryptedImgPath = CryptoJS.AES.encrypt(
      `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${
        req.file.filename
      }`,
      process.env.IMGKEY
    ).toString();
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Age: req.body.Age,
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
        Patients: req.body.Patients,
      }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    User.findOneAndUpdate(
      { _id: req.params.ID },
      {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Age: req.body.Age,
        Gender: req.body.Gender,
        Country: req.body.Country,
        Tel: req.body.Tel,
        Role: req.body.Role,
        Email: req.body.Email,
        FaintsPerDay: req.body.FaintsPerDay,
        AgeWhenDiagnosed: req.body.AgeWhenDiagnosed,
        Location: req.body.Location,
        Guardians: req.body.Guardians,
        Patients: req.body.Patients,
      }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
        console.log(err);
      });
  }
}

export function deleteOnce(req, res) {
  User.findOneAndRemove(req.params.id, req.body)
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
