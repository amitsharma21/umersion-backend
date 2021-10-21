import express from "express";
import fileUpload from "express-fileupload";

import {
  createSession,
  deleteSession,
  fetchAllSessions,
  fetchSingleSession,
} from "../controllers/session.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

router.post("/create", createSession);
router.delete("/delete/:id", deleteSession);
router.get("/fetchall", fetchAllSessions);
router.get("/fetchsingle/:id", fetchSingleSession);

export default router;
