const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasta de projetos
const PROJECTS_DIR = path.join(__dirname, 'projects');
if (!fs.existsSync(PROJECTS_DIR)) {
  fs.mkdirSync(PROJECTS_DIR);
}

// Rota POST
app.post('/create-project', (req, res) => {
  const { projectName = 'novo-app' } = req.body;
  const projectPath = path.join(PROJECTS_DIR, projectName);

  if (fs.existsSync(projectPath)) {
    return res.status(400).json({ error: 'Projeto já existe.' });
  }

  const command = `npx expo init ${projectName} --template blank`;
  exec(command, { cwd: PROJECTS_DIR }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ message: `Projeto ${projectName} criado com sucesso!`, output: stdout });
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
