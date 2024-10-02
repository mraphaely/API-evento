import { Router } from "express";
import { register, inscrever } from "../controllers/participante-controller.js";

const router = Router();

router.post("/participantes/register", register);
router.post("/participantes/inscrever", inscrever);

export default router;