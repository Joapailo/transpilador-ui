const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const TEMPLATE_PATH = path.join(__dirname, "template");

app.post("/criar-projeto", async (req, res) => {
    const { nomeProjeto } = req.body;
    if (!nomeProjeto) return res.status(400).json({ erro: "Nome do projeto é obrigatório" });

    const destino = path.join(__dirname, "projetos", nomeProjeto);
    try {
        await fs.copy(TEMPLATE_PATH, destino);
        return res.json({ sucesso: true, caminho: destino });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao criar projeto", detalhes: erro.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});