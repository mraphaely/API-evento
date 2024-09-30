/*
 MODEL -> DB BD -> Regras de negócio.
 CONTROLLER -> Controla o que vem da view e devolve o que vem do model.
 VIEW -> Páginas.
*/
import "dotenv/config";
import express from "express";
import cors from "cors";

//importar conexão com o banco
import conn from "./config/connDB.js";

//importar modulos
import "./models/evento-model.js";
import "./models/palestrante-model.js";
import "./models/participante-model.js";

//importar as rotas
import palestranteRouter from "./routes/palestrante-router.js";

const PORT = process.env.PORT || 3333;
const app = express();

// 3 middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());//permite usar informações no formato json

//utilizar rotas
app.use("/eventos", palestranteRouter);
// app.use("/palestrantes", palestranteRouter);

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada." });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
