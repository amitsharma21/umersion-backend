import express from "express";
import fileUpload from "express-fileupload";

import {
  createMotivation,
  fetchSingleMotivation,
  fetchAllMotivations,
  updateMotivation,
  deleteMotivation,
} from "../controllers/motivation.js";

const router = express.Router();

//setup for file upload
router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

router.post("/create", createMotivation);
router.get("/fetchsingle/:id", fetchSingleMotivation);
router.get("/fetchall", fetchAllMotivations);
router.patch("/update/:id", updateMotivation);
router.delete("/delete/:id", deleteMotivation);

export default router;
