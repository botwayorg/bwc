import express from "express";
const router = express.Router();
import { handleLogout } from "../controllers/logoutController";

router.get("/", handleLogout);

module.exports = router;
