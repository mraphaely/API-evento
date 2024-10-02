import { Router } from "express";
import { create, getAll } from "../controllers/evento-controller.js";

const router = Router();

router.post("/create", create);
router.get("/agenda", getAll);

export default router;
