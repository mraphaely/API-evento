import { Router } from "express";
import { register, listar } from "../controllers/palestrante-controller.js";

const router = Router();

router.post("/palestrantes", register);
router.get("/palestrantes", listar);

export default router;
