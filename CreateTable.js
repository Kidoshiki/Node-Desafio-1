import { sql } from "./Db.js";

// sql`DROP TABLE IF EXISTS videos;` .then(() => {console.log('Tabela Apagada!')})



sql`
    CREATE TABLE videos (
    id Text PRIMARY Key,
    title Text,
    description Text,
    duration INTEGER
);
`
.then (() => {
console.log('Tabela Criada')
})