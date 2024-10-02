import conn from "../config/connDB.js";

const tableInscricao = /*sql*/`
     CREATE TABLE IF NOT EXISTS inscricao(
        inscricao_id VARCHAR(60) PRIMARY KEY,
        participante_id VARCHAR(255) NOT NULL,
        evento_id VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(evento_id) REFERENCES eventos(evento_id),
        FOREIGN KEY(participante_id) REFERENCES participantes(participante_id)
     )
`
conn.query(tableInscricao, (err) => {
    if(err){
       return console.error(err);
    }
    console.log("Tabela [inscrição] criada com sucesso!");
});