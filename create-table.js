import { sql } from './db.js';

async function createTable() {
  console.log("Iniciando script...");
  
  try {
    await sql.query(`DROP TABLE IF EXISTS videos;`);
    console.log("Tabela antiga 'videos' derrubada (se existia).");

    await sql.query(`
      CREATE TABLE videos (
          id          VARCHAR(255) PRIMARY KEY,
          title       TEXT,
          description TEXT,
          duration    INTEGER
      );
    `);
    
    console.log("✅ Tabela 'videos' recriada com sucesso (com id VARCHAR)!");
    
  } catch (err) {
    console.error("❌ Erro ao executar o script:", err);
  } finally {
    await sql.end();
    console.log("Conexão com o MySQL fechada.");
  }
}

createTable();