import express from 'express';
import { addOnce, deleteOnce, emailsend, emailverify, getAll, getById, login, register, updateOnce, updatePassword } from '../controllers/userController.js';
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
router.route('/email').post(emailsend);
router.route('/verify/:id/:token').get(emailverify);
router.post("/home",auth, (req, res) => {
    res.status(200).send("Logged in");
  });


export default router;