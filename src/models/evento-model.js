import conn from "../config/connDB.js";

const tableEvento = /*sql*/`
     CREATE TABLE IF NOT EXISTS eventos(
        evento_id VARCHAR(60) PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        data_evento VARCHAR(60) NOT NULL,
        palestrante_id VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(palestrante_id) REFERENCES palestrantes(palestrante_id)
     )
`
conn.query(tableEvento, (err) => {
    if(err){
       return console.error(err);
    }
    console.log("Tabela [eventos] criada com sucesso!");
});