import express from "express";
import {
  addGuardian,
  addPatient,
  deleteGuardian,
  deletePatient,
  getAll,
  getById,
  getGuardians,
  getPatients,
  updateOnce,
  updatePassword,
  updatePhoto,
} from "../controllers/userController.js";
import {
  register,
  login,
  logout,
  googlelogin,
  sendverifyEmail,
  verifyEmail,
  sendpasswordEmail,
  resetPassword,
  googleregister,
} from "../controllers/authController.js";
import multer from "../middlewares/multer-config.js";
import auth from "../middlewares/auth.js";

const router = express.Router();



/**
 * @swagger 
 * /user:
 *  get:
 *     description: Use to get all users
 *     responses: 
 *         '200':
 *            description: A successful response
 */
router.route("/").get(getAll);



router.route("/:id").get(getById);
router.route("/updatephoto/:ID").post(multer,updatePhoto);
router.route("/update/:ID").put(updateOnce);
router.route("/googlelogin").post(googlelogin);
router.route("/login").post(login);
router.route("/logout/:id").post(logout);
router.route("/register").post(register);
router.route("/googleregister").post(googleregister);
router.route("/updatepassword/:id").put(updatePassword);
router.route("/verificationemail").post(sendverifyEmail);
router.route("/verify/:id/:emailtoken").get(verifyEmail);
router.route("/passwordemail").post(sendpasswordEmail);
router.route("/resetpassword").post(resetPassword);

router.route("/getGuardians/:id").get(getGuardians);
router.route("/addGuardian/:id").post(addGuardian);
router.route("/deleteGuardian/:id").post(deleteGuardian);
router.route("/deletePatient/:id").post(deletePatient);

router.route("/getPatients/:id").get(getPatients);
router.route("/addPatient/:id").post(addPatient);

router.post("/home", auth, (req, res) => {
  res.status(200).send("Logged in");
});

export default router;
