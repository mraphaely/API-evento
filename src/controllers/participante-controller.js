import conn from "../config/connDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

//helpers
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/user-token.js"

export const register = (request, response) => {
    const { nome, email } = request.body

    if (!nome) {
        return response.status(400).json({ error: 'o campo nome é obrigatório' })
    }
    if (!email) {
        return response.status(400).json({ error: 'o campo email é obrigatório' })
    }
    //verifucar se email é valido
    if (!email.includes("@")) {
        return response.status(409).json({ error: 'Digite um email válido com @' })
    }

    const checkSql = /*sql*/`SELECT * FROM participantes WHERE ?? = ?`
    const checkSqlData = ['email', email];
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({ error: 'Erro ao verificar se o email já existe' });
        }
        //2°
        if (data.length > 0) {
            return response.status(409).json({ error: 'Email já está em uso.' })
        }

        //criar
        const id = uuidv4();

        const insertSql = /*sql*/`INSERT INTO participantes (??, ??, ??)
    VALUES (?, ?, ?)`
        const insertSqlData = [
            "participante_id", "nome", "email",
            id, nome, email
        ];

        conn.query(insertSql, insertSqlData, (err) => {
            if (err) {
                console.log(err)
                return response.status(500).json({ error: 'Erro ao cadastrar' })
            } else {
                response.status(201).json({ message: "Usuário cadastrado" })
            }
        });
    });
};

export const inscrever = async (request, response) => {
    const { participanteId, eventoId } = request.body
    const checkSql = /*sql*/`SELECT * FROM inscricao WHERE ?? = ? AND
    ?? = ?`
    const checkSqlData = ['participante_id', participanteId, 'evento_id',
        eventoId];
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({
                error: 'Erro ao verificar se o participante já está inscrito'
            });
        }
        //1° 
        if (data.length > 0) {
            return response.status(409).json({ error: 'Participante já está inscrito' })
        }
    })

}