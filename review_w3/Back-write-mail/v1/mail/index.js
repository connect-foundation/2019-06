import { Router } from "express";
import multer from "multer";
import controller from "./controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const { MAIL_FILE_MAX_COUNT } = process.env;

router.post("/", upload.array("attachments", MAIL_FILE_MAX_COUNT), controller.write);

export default router;
