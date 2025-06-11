const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasta onde os projetos serão criados
const PROJECTS_DIR = path.join(__dirname, 'projects');

if (!fs.existsSync(PROJECTS_DIR)) {
  fs.mkdirSync(PROJECTS_DIR);
}

app.post('/create-project', (req, res) => {
  const { projectName = 'novo-app' } = req.body;
  const projectPath = path.join(PROJECTS_DIR, projectName);

  if (fs.existsSync(projectPath)) {
    return res.status(400).json({ error: 'Projeto já existe.' });
  }

  // Comando para inicializar projeto Expo
  const command = `npx expo init ${projectName} --template blank`;

  // Execute dentro da pasta projects
  exec(command, { cwd: PROJECTS_DIR }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro: ${error.message}`);
      return res.status(500).json({ error: 'Falha ao criar projeto.', details: stderr });
    }
    res.json({ message: `Projeto ${projectName} criado com sucesso!`, output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});