import { Router } from "express";
import { register, listar } from "../controllers/evento-controller.js";

const router = Router();

router.post("/eventos/register", register);
router.get("/eventos/listar", listar);

export default router;
