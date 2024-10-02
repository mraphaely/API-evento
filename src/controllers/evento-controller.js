import conn from "../config/connDB.js";
import { v4 as uuidv4 } from "uuid";

//helpers
import getUserByToken from "../helpers/user-token.js";
import getToken from "../helpers/get-token.js";

export const create = async (request, response) => {
    const { titulo, data } = request.body;

    ///buscar user por token
    const token = getToken(request)
    const palestrantes = await getUserByToken(token)
    // console.log(user)

    if (!titulo) {
        return response.status(400).json({ message: "O titulo do evento é obrigatório" })
    }
    if (!data) {
        return response.status(400).json({ message: "A data do evento é obrigatória" })
    }

    const evento_id = uuidv4();
    const palestrante_id = palestrantes.palestrante_id;
    const eventoSql = /*sql*/`INSERT INTO eventos (??, ??, ??, ??) VALUES (?, ?, ?, ?)`;

    const eventoValues = [
        "evento_id", "titulo", "data", "palestrante_id",
         evento_id,   titulo,   data,   palestrante_id
    ];

    conn.query(eventoSql, eventoValues, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao adicionar evento" });
        } else {
            response.status(201).json({ message: "Evento criado com sucesso!" })
        };
    });
    // response.status(200).json("hi world!")
};

export const getAll = async (request, response) => {
    const getSQL =   /*sql*/ `SELECT * FROM eventos, palestrantes.nome 
          AS palestrante_nome, palestrantes.expertise AS palestrante_expertise
          FROM eventos LEFT JOIN palestrantes 
          ON eventos.palestranteId = palestrantes.id 
          `;

    conn.query(getSQL, (err, data) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ err: "Erro ao buscar eventos" })
        }
        const eventos = data
        response.status(200).json(eventos);
    });
};
