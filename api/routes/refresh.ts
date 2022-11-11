import express from "express";
const router = express.Router();
import { handleRefreshToken } from "../controllers/refreshTokenController";

router.get("/", handleRefreshToken);

module.exports = router;
