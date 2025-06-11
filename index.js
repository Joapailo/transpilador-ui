const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota padrão
app.get("/", (req, res) => {
  res.send("API do Expor rodando com sucesso! 🚀");
});

// Rota para criar um projeto Expo
app.post("/criar-projeto", (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).send("Nome do projeto é obrigatório");

  exec(`npx create-expo-app ${nome}`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(`Erro ao criar projeto: ${stderr}`);
    }
    res.send(`Projeto ${nome} criado com sucesso!`);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
