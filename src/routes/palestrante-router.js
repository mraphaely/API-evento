import { Router } from "express";
import { register, listar } from "../controllers/palestrante-controller.js";

const router = Router();

router.post("/palestrantes/registrar", register);
router.get("/palestrantes/listar", listar);

export default router;
