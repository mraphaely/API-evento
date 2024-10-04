import conn from "../config/connDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

//helpers
import verifyToken from "../helpers/verify-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/user-token.js"
import { request, response } from "express";

export const register = (request, response) => {
    const { nome, email } = request.body

    // const token = getToken(request);
    // const participantes = await getUserByToken(token);

    // const participanteId = participantes.participante_id;

    if (!nome) {
        return response.status(400).json({ error: 'o campo nome é obrigatório' })
    }
    if (!email) {
        return response.status(400).json({ error: 'o campo email é obrigatório' })
    }
    //verificar se email é valido
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
        const insertSql = /*sql*/`INSERT INTO participantes (participante_id, nome, email)
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
                response.status(201).json({ message: "Participante cadastrado" })
            }
        });
    });
};

export const inscrever = async (request, response) => {
    const { participanteId, eventoId } = request.body

    const token = getToken(request);
    const participantes = await getUserByToken(token);

    const participante_id = participantes.participante_id;

    if(!participanteId){
        return response.status(400).json({ error: 'o campo participanteId é obrigatório'});
    }
    if(!eventoId){
        return response.status(400).json({ error: 'o campo eventoId é obrigatório'})
    }

    const checkSql = /*sql*/`SELECT * FROM inscricao WHERE ?? = ? AND
    ?? = ?`
    const checkSqlData = [
        'participante_id', participanteId, 'evento_id', eventoId
    ];
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({ message: 'Erro ao verificar se o participante já está inscrito' });
        }
        //1° 
        if (data.length > 0) {
            return response.status(409).json({ error: 'Participante já está inscrito' })
        }

        const insertSql = /*sql*/ `INSERT INTO inscricao (participante_id, evento_id) VALUES (?, ?)
        `;
            conn.query(insertSql, checkSqlData [participante_id]);
        
                response.status(201).json({ message: 'Inscrição realizada com sucesso' });
            if (err) {
                console.log(err);
                response.status(500).json({ error: 'Erro ao realizar inscrição' });
            }
        });    
};

export const feedback = async (request, response) => {
    const { participanteId, eventoId, nota, comentario } = request.body

    if(!participanteId){
        return response.status(400).json({ error: 'o campo participanteId é obrigatório'});
    }
    if(!eventoId){
        return response.status(400).json({ error: 'o campo eventoId é obrigatório'})
    }
    if(!nota){
        return response.status(400).json({ error: 'o campo nota é obrigatório'})
    }
    if(!comentario){
        return response.status(400).json({ error: 'o campo comentário é obrigatório'})
    }

    const checkSql = /*sql*/`SELECT * FROM feedback WHERE ?? = ? AND
    ?? = ?`
    const checkSqlData = [
        'participante_id', participanteId, 'evento_id', eventoId
    ];
    conn.query(checkSql, checkSqlData, (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({ error: 'Erro ao verificar se o palestrante já existe' });
        }
        //2°
        if (data.length > 0) {
            return response.status(409).json({ error: 'Participante já cadastrado!' })
        }

        //criar 
        const insertSql = /*sql*/`INSERT INTO feedback (??, ??, ??, ??) VALUES (?, ?, ?, ?)`
        const insertSqlData = [
            "participante_id", "evento_id", "nota", "comentario",
             participanteId, eventoId, nota, comentario
            ];

        conn.query(insertSql, insertSqlData, (err) => {
            if (err) {
                console.log(err)
                return response.status(500).json({ error: 'Erro ao adicionar feedback' })
            }

            })
            response.status(201).json({ message: "Feedback adicionado com sucesso" })
        });
};
