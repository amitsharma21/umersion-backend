import express from "express";

import { fetchContactus, createContactus } from "../controllers/contactus.js";

const router = express.Router();

router.get("/fetch", fetchContactus);
router.post("/create", createContactus);

export default router;
