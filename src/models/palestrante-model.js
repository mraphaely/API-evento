import conn from "../config/connDB.js";

const tablePalestrante = /*sql*/`
     CREATE TABLE IF NOT EXISTS palestrantes(
        palestrante_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        expertise TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     )
`
conn.query(tablePalestrante, (err) => {
    if(err){
       return console.error(err);
    }
    console.log("Tabela [palestrantes] criada com sucesso!");
});