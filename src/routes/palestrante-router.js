import { Router } from "express";
import { register, listar } from "../controllers/palestrante-controller.js";

const router = Router();

router.post("/registrar", register);
router.get("/listar", listar);

export default router;
