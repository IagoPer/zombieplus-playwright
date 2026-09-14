const { Pool } = require("pg");

const DbConfig = {
  user: "postgres",
  host: "db.jasfplbewntvetkedyaa.supabase.co",
  database: "postgres",
  password: "feelsoclose08",
  port: 5432,
};

export async function executeSQL(sqlScript) {
  try {
    const poll = new Pool(DbConfig);
    const client = await poll.connect();

    const result = await client.query(sqlScript);
    console.log(result.rows);
  } catch (error) {
    console.log('Erro ao executar SQL ' + error)
  }
}
