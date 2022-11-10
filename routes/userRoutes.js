import express from 'express';
import { addOnce, deleteOnce, getAll, getById, updateOnce } from '../controllers/userController.js';
import multer from '../middlewares/multer-config.js'


const router=express.Router();


router
    .route('/')
    .get(getAll)
    .post(
        multer,
        addOnce
    );

 
router
    .route('/:id')
    .get(getById)
    .put(
        multer,
        updateOnce)
    .delete(deleteOnce);

export default router;