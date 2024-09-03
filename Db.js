import 'dotenv/config'; // Importa e configura as variáveis de ambiente
import postgres from 'postgres'; // Importa o módulo postgres

// Descodifica as variáveis de ambiente
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGUSER = decodeURIComponent(PGUSER);
PGPASSWORD = decodeURIComponent(PGPASSWORD);
PGDATABASE = decodeURIComponent(PGDATABASE);

// Configura a conexão com o banco de dados PostgreSQL
export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export default sql;