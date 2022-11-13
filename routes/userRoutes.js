import express from 'express';
import { addOnce, deleteOnce,getAll, getById, login, register, resetPassword, sendpasswordEmail, sendverifyEmail, updateOnce, updatePassword, verifyEmail } from '../controllers/userController.js';
import multer from '../middlewares/multer-config.js'
import auth from "../middlewares/auth.js";


const router=express.Router();


router
    .route('/')
    .get(getAll)
    .post(multer,addOnce);

 
router
    .route('/:id')
    .get(getById)
    
    .put(
        multer,
        updateOnce)
    .delete(deleteOnce);

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/pw/:id').put(updatePassword);
router.route('/email').post(sendverifyEmail);
router.route('/verify/:id/:token').get(verifyEmail);
router.route('/passwordemail').post(sendpasswordEmail);
router.route('/resetpassword/:id').post(resetPassword)
router.post("/home",auth, (req, res) => {
    res.status(200).send("Logged in");
  });


export default router;