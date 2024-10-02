import jwt from "jsonwebtoken";
import conn from "../config/connDB.js";

const getUserByToken = async (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return response.status(401).json({ message: "Acesso Negado" })
        }

        const decoded = jwt.verify(token, "SENHASUPERSEGURA")
        const participanteId = decoded.id;
        

        const checkSql = /*sql*/`SELECT * FROM palestrantes WHERE ?? = ?`
        const checkSqlData = ["participante_id", participanteId]
        conn.query(checkSql, checkSqlData, (err, data) => {
            if (err) {
                reject ({ status: 500, message: "Erro ao buscar usuário" });
            } else {
                resolve(data[0]);
            }
        });
    });
};

export default getUserByToken;