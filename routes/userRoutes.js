import express from 'express';
import { deleteOnce,getAll, getById, updateOnce, updatePassword } from '../controllers/userController.js';
import { register,login, logout,sendverifyEmail,verifyEmail, sendpasswordEmail,resetPassword} from '../controllers/authController.js';
import multer from '../middlewares/multer-config.js'
import auth from "../middlewares/auth.js";


const router=express.Router();

router
    .route('/')
    .get(getAll)
router
    .route('/:id')
    .get(getById)
router.route('/update/:ID')  
  .put(updateOnce)

router.route('/login').post(login);
router.route('/logout/:id').post(logout);
router.route('/register').post(register);
router.route('/pw/:id').put(updatePassword);
router.route('/verificationemail').post(sendverifyEmail);
router.route('/verify/:id/:emailtoken').get(verifyEmail);
router.route('/passwordemail').post(sendpasswordEmail);
router.route('/resetpassword').post(resetPassword)

router.post("/home",auth, (req, res) => {
    res.status(200).send("Logged in");
  });


export default router;