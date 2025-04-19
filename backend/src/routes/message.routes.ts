import express from "express";
import { handleMessage } from "../controllers/message.controller";

const router = express.Router();
router.post("/", handleMessage);

export default router;
