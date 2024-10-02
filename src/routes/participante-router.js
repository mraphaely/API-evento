import { Router } from "express";
import { register, inscrever } from "../controllers/participante-controller.js";

//helpers
import verifyToken from "../helpers/verify-token.js";

const router = Router();

router.post("/participantes/register", verifyToken, register);
router.post("/participantes/inscrever", verifyToken, inscrever);

export default router;