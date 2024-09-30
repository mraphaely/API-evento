import conn from "../config/connDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const register = (request, response) => {
    const { nome, expertise } = request.body

    if (!nome) {
        return response.status(400).json({ error: 'o campo nome é obrigatório' })
    }
    if (!expertise) {
        return response.status(400).json({ error: 'o campo expertise é obrigatório' })
    }

    const checkSql = /*sql*/`SELECT * FROM palestrantes WHERE ?? = ? AND ?? = ?`
    const checkSqlData = [
        'nome', nome, 
        'expertise', expertise
        ];
    conn.query(checkSql, checkSqlData, (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({ error: 'Erro ao verificar se o palestrante já existe' });
        }
        //2°
        if (data.length > 0) {
            return response.status(409).json({ error: 'Palestrante já cadastrado!' })
        }

        //criar 
        const id = uuidv4();
        const insertSql = /*sql*/`INSERT INTO palestrantes (??, ??, ??) VALUES (?, ?, ?)`
        const insertSqlData = ["palestrante_id", "nome", "expertise", id, nome, expertise];

        conn.query(insertSql, insertSqlData, (err) => {
            if (err) {
                console.log(err)
                return response.status(500).json({ error: 'Erro ao cadastrar palestrante' })
            }

            })
            response.status(201).json({ message: "Palestrante cadastrado" })
        })
};

export const listar = (request, response) => {
    const getSQL =   /*sql*/ `SELECT * FROM palestrantes`
    conn.query(getSQL, (err, data) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ err: "Erro ao buscar palestrantes" })
        }
        const palestrantes = data
        response.status(200).json(palestrantes);
    })
};
