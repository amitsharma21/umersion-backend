import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import faqRoutes from "./routes/faq.js";
import contactusRoutes from "./routes/contactus.js";
import termsAndConditionsRoutes from "./routes/termsandcondition.js";
import privacyPolicyRoutes from "./routes/privacypolicy.js";
import remainderRoutes from "./routes/remainder.js";
import noteRoutes from "./routes/note.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//dashboard routes
app.use("/admin", adminRoutes);
//normal user routes
app.use("/user", userRoutes);
//faq route
app.use("/faq", faqRoutes);
//contactus route
app.use("/contactus", contactusRoutes);
//terms and condition route
app.use("/tac", termsAndConditionsRoutes);
//privacy policy route
app.use("/privacypolicy", privacyPolicyRoutes);
//remaider route
app.use("/remainder", remainderRoutes);
//notes route
app.use("/note", noteRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Umersion API version 1.0");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
  })
  .catch((error) => console.log(error.message));