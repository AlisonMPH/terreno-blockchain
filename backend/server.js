import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' }; // Ajuste para usar 'assert'
import cors from 'cors'; // Importe o pacote CORS

const app = express();
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./realEstate.db');

// Criar tabela para armazenar propriedades (se não existir)
db.run(`
  CREATE TABLE IF NOT EXISTS propriedades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    transactionHash TEXT
  )
`);

// Rota para salvar uma propriedade no SQLite
app.post('/propriedades', (req, res) => {
  const { name, price, transactionHash } = req.body;

  db.run(
    `INSERT INTO propriedades (name, price, transactionHash) VALUES (?, ?, ?)`,
    [name, price, transactionHash],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Erro ao salvar no banco de dados" });
      }
      res.json({ message: "Propriedade salva com sucesso", id: this.lastID });
    }
  );
});

// Rota para listar todas as propriedades
app.get('/propriedades', (req, res) => {
  db.all(`SELECT * FROM propriedades`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar propriedades" });
    }
    res.json(rows);
  });
});

// Rota para obter uma propriedade específica por ID
app.get('/propriedades/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM propriedades WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar propriedade" });
    }
    if (!row) {
      return res.status(404).json({ message: "Propriedade não encontrada" });
    }
    res.json(row);
  });
});

// Rota para excluir uma propriedade
app.delete('/propriedades/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM propriedades WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Erro ao excluir propriedade" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Propriedade não encontrada" });
    }
    res.json({ message: "Propriedade excluída com sucesso" });
  });
});

// Configurar o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
