import conn from "../config/connDB.js";

const tableFeedback = /*sql*/`
     CREATE TABLE IF NOT EXISTS feedback(
        participante_id VARCHAR(60) NOT NULL,
        evento_id VARCHAR(60) PRIMARY KEY,
        nota INT NOT NULL,
        comentario VARCHAR(120) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(participante_id) REFERENCES participantes(participante_id),
        FOREIGN KEY(evento_id) REFERENCES eventos(evento_id)
     )
`
conn.query(tableFeedback, (err) => {
    if(err){
       return console.error(err);
    }
    console.log("Tabela [feedback] criada com sucesso!");
});