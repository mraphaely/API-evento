import { Router } from "express";
import { create, agenda, dell, mod, maisAtivo, maisPopular, meusEventos } from "../controllers/evento-controller.js";

const router = Router();

router.post("/create", create);
router.get("/agenda", agenda);
router.get("/mais-popular", maisPopular);
router.get("/palestrante-mais-ativo", maisAtivo);
router.get("/meus-eventos/:id", meusEventos);
router.put("/editar/:id", mod);
router.delete("/cancelar/:id", dell);

export default router;
