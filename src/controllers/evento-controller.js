import conn from "../config/connDB.js";
import { v4 as uuidv4 } from "uuid";

//helpers
import getUserByToken from "../helpers/user-token.js";
import getToken from "../helpers/get-token.js";
import { request, response } from "express";

export const create = async (request, response) => {
    const { titulo, data_evento, palestrante_id } = request.body;

    if (!titulo) {
        return response.status(400).json({ message: "O titulo do evento é obrigatório" })
    }
    if (!data_evento) {
        return response.status(400).json({ message: "A data do evento é obrigatória" })
    }

    const evento_id = uuidv4();
    // const palestrante_id = /*sql*/`SELECT FROM palestrantes.palestrante_id`;
    const eventoSql = /*sql*/`INSERT INTO eventos (evento_id, titulo, data_evento, palestrante_id) VALUES (?, ?, ?, ?)`;

    const eventoValues = [
        // "evento_id", "titulo", "data_evento", "palestrante_id",
        evento_id, titulo, data_evento, palestrante_id
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

export const agenda = (request, response) => {
    const getSQL =   /*sql*/ `SELECT * FROM eventos, GROUP_CONCAT(palestrantes.nome)
          AS palestrante_nome, palestrantes.expertise AS palestrante_expertise
          FROM eventos LEFT JOIN palestrantes 
          ON GROUP BY eventos.palestranteId = palestrantes.id 
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

export const maisPopular = (request, response) => {
    const checkSql = /*sql*/`
    SELECT e.*, COUNT(i.participante_id) AS participantes 
    FROM eventos e 
    LEFT JOIN inscricoes i ON e.id = i.evento_id 
    GROUP BY e.id 
    ORDER BY participantes DESC 
    LIMIT 1
`;
    conn.query(checkSql, (err, data) => {
        if (err) {
            console.log(err);
            return response.status(500).json({ message: "Erro ao buscar evento mais popular" }, err);
        }
        const eventos = data
        response.status(200).json(eventos[0]);
    });
};

export const maisAtivo = (request, response) => {
    const checkSql = /*sql*/`
    SELECT * FROM palestrantes, COUNT(palestrante.evento_id) AS eventos 
    FROM palestrantes  
    LEFT JOIN palestrantes ON palestrante_id  
    GROUP BY palestrante_id 
    ORDER BY eventos DESC 
    LIMIT 1
`;
    conn.query(checkSql, (err, data) => {
        if (err) {
            console.log(err);
            return response.status(500).json({ message: "Erro ao buscar evento mais popular" }, err);
        }
        const eventos = data
        response.status(200).json(eventos[0]);
    });
};

export const meusEventos = (request, response) => {
    const participanteId = request.params.id;
    
    if(!participanteId) {
        return response.status(400).json({ message: 'o id do participante é obrigatório' });
    }

    const meusEventos = eventos.filter(evento => evento.participantes.includes(participanteId));

    response.status(200).json(meusEventos);
};

export const mod = (request, response) => {
    const evento_id = request.params.id;
    const { titulo, data, palestrante_id } = request.body;

    if (!titulo) {
        return response.status(400).json({ message: "O titulo do evento é obrigatório" })
    }
    if (!data) {
        return response.status(400).json({ message: "A data do evento é obrigatória" })
    }
    if (!palestrante_id) {
        return response.status(400).json({ message: "O id do palestrante é obrigtório" })
    }

    const eventoSql = /*sql*/`UPDATE eventos SET titulo = ?, data_evento = ?, palestr
    ante_id = ? WHERE evento_id = ?`
    const eventoValues = [
        titulo, data, palestrante_id, evento_id
    ];
    conn.query(eventoSql, eventoValues, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao atualizar evento" });
        } else {
            response.status(200).json({ message: "Evento atualizado com sucesso!" })
        }
    });
};

export const dell = (request, response) => {
    const evento_id = request.params.id;
    const eventoSql = /*sql*/ `DELETE FROM eventos WHERE evento_id = ?`
    conn.query(eventoSql, evento_id, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao deletar evento" });
        }
        response.status(200).json({ message: "Evento deletado com sucesso!" })
    });
};


