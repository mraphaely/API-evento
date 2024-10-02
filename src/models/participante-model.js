import conn from "../config/connDB.js";

const tableParticipante = /*sql*/`
     CREATE TABLE IF NOT EXISTS participantes(
        participante_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )
`
conn.query(tableParticipante, (err) => {
    if(err){
       return console.error(err);
    }
    console.log("Tabela [participantes] criada com sucesso!");
});