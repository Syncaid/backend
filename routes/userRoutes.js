import express from "express";
import {
  addGuardian,
  addPatient,
  deleteOnce,
  getAll,
  getById,
  getGuardians,
  getPatients,
  updateOnce,
  updatePassword,
} from "../controllers/userController.js";
import {
  register,
  login,
  logout,
  sendverifyEmail,
  verifyEmail,
  sendpasswordEmail,
  resetPassword,
} from "../controllers/authController.js";
import multer from "../middlewares/multer-config.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(getAll);
router.route("/:id").get(getById);
router.route("/update/:ID").put(updateOnce);

router.route("/login").post(login);
router.route("/logout/:id").post(logout);
router.route("/register").post(register);
router.route("/pw/:id").put(updatePassword);
router.route("/verificationemail").post(sendverifyEmail);
router.route("/verify/:id/:emailtoken").get(verifyEmail);
router.route("/passwordemail").post(sendpasswordEmail);
router.route("/resetpassword").post(resetPassword);

router.route("/getGuardians/:id").get(getGuardians);
router.route("/addGuardian/:id").post(addGuardian);

router.route("/getPatients/:id").get(getPatients);
router.route("/addPatient/:id").post(addPatient);

router.post("/home", auth, (req, res) => {
  res.status(200).send("Logged in");
});

export default router;
