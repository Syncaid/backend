import express from "express";
import {
  getByUser,
  getAll,
  getById,
  updateOnce,
  addOnce,
} from "../controllers/faintController.js";

const router = express.Router();

router.route("/").get(getAll).post(addOnce);
router.route("/:id").get(getById);

router.route("/update/:ID").put(updateOnce);

router.route("/byUserId/:id").get(getByUser);

export default router;
