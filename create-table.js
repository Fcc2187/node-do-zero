// create-table.js (Versão Corrigida Definitiva)

import { sql } from './db.js';

async function createTable() {
  console.log("Iniciando script...");
  
  try {
    // 1. DERRUBA A TABELA ANTIGA (COM O 'id' ERRADO)
    await sql.query(`DROP TABLE IF EXISTS videos;`);
    console.log("Tabela antiga 'videos' derrubada (se existia).");

    // 2. CRIA A TABELA NOVA (COM O 'id' CORRETO)
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
    // Fecha a conexão
    await sql.end();
    console.log("Conexão com o MySQL fechada.");
  }
}

createTable();