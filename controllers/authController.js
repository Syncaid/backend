import { User } from "../models/user.js"; // add validate
import { validationResult } from "express-validator";
import verificationEmail from "../utils/verificationEmail.js";
import passwordEmail from "../utils/passwordEmail.js";
import Emailtoken from "../models/emailtoken.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const { FirstName, LastName, Email, Password } = req.body;

  if (!(Email && Password && FirstName && LastName)) {
    res.status(400).send("All fields are required");
  }

  const oldUser = await User.findOne({ Email });
  if (oldUser) {
    return res.status(409).send("User already exists");
  }

  let NewUser = new User({
    FirstName,
    LastName,
    Email: Email.toLowerCase(),
    Password: await bcrypt.hash(Password, 10),
  });

  User.create(NewUser)
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function login(req, res) {
  const { Email, Password } = req.body;

  if (!(Email && Password)) {
    res.status(400).send("All fields are required");
  }

  const user = await User.findOne({ Email: req.body.Email });

  if (user) {
    if (await bcrypt.compare(Password, user.Password)) {
      const newToken = await jwt.sign({ id: user._id }, process.env.TOKENKEY, {
        expiresIn: "4h",
      });
      user.Token = newToken;
      user
        .updateOne({ _id: user._id, Token: newToken })
        .then((docs) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } else {
    res.status(404).send("Unexistant user");
  }
}


export async function googlelogin(req, res) {
  const { Email } = req.body;

  if (!(Email)) {
    res.status(400).send("All fields are required");
  }

  const user = await User.findOne({ Email: req.body.Email });

  if (user) {
  
      const newToken = await jwt.sign({ id: user._id }, process.env.TOKENKEY, {
        expiresIn: "4h",
      });
      user.Token = newToken;
      user
        .updateOne({ _id: user._id, Token: newToken })
        .then((docs) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
   
  } else {
    res.status(404).send("Unexistant user");
  }
}

export async function logout(req, res) {
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      Token: null,
    }
  )
    .then((docs) => {
      res.status(201).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function sendverifyEmail(req, res) {
  let user = await User.findOne({ Email: req.body.Email });
  if (user) {
    let newemailtoken = new Emailtoken({
      userId: user._id,
    });
    let token = jwt.sign({ id: user._id }, process.env.TOKENKEY);
    newemailtoken.token = token;
    Emailtoken.create(newemailtoken)
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });

    const message = `${req.protocol}://${process.env.DEVURL}:${process.env.PORT}/user/verify/${user._id}/${newemailtoken.token}`;

    verificationEmail(user.Email, "Email verification", message);
  }
}

export async function verifyEmail(req, res) {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("Invalid link");

  const emailtoken = await Emailtoken.findOne({
    userId: user._id,
    token: req.params.emailtoken,
  });
  if (!emailtoken) return res.status(400).send("Token invalid");

  await user.updateOne({ _id: user._id, Verified: 1 });
  await Emailtoken.findByIdAndRemove(emailtoken._id);

  res.send("Email verified sucessfully");
}

export async function sendpasswordEmail(req, res) {
  let user = await User.findOne({ Email: req.body.Email });
  if (user) {
    const OTP = Math.floor(1000 + Math.random() * 9000).toString();
    User.findOneAndUpdate(
      { _id: user._id },
      {
        vString: OTP,
      }
    )
      .then(async (docs) => {
        passwordEmail(user.Email, "Password reset", OTP);
        user.vString = OTP;
        res.status(200).json(OTP);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export async function resetPassword(req, res) {
  const user = await User.findOne({ Email: req.body.Email });
  // const date = parseInt(Date.now())
  //const userdate = parseInt((user.vString.created))

  //  if((date - userdate) >= 600000 ){
  //  res.status(400).send("This code is expired, request another one")
  //}
  // else {
  if (user) {
    if (req.body.vString === user.vString) {
      const EncryptedPassword = await bcrypt.hash(req.body.Password, 10);
      await User.findOneAndUpdate(
        { _id: user._id },
        {
          Password: EncryptedPassword,
        }
      )
        .then((docs) => {
          res.status(200).json(docs);
        })
        .catch((err) => {
          res.status(500).json("Cant reset password");
        });
    }
  }
  // }
}
