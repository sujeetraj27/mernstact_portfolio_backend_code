import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteExperience, getAllExperience, postExperience } from "../controller/experienceController.js";

const router = express.Router();

router.post("/add", isAuthenticated, postExperience);
router.delete("/delete/:id", isAuthenticated, deleteExperience);
router.get("/getall", getAllExperience);

export default router;
