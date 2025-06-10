function gerarPreview() {
  const editor = document.getElementById('editor').value;
  let html = '';

  try {
    html = transpilar(editor);
  } catch (e) {
    html = '<p style="color:red;">Erro: ' + e.message + '</p>';
  }

  const iframe = document.getElementById('preview');
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
}

function transpilar(code) {
  const lines = code.split(/\n|\r/).map(line => line.trim()).filter(Boolean);
  let html = '<div style="padding: 10px;">';

  lines.forEach(line => {
    if (line.startsWith("Text:")) {
      const text = line.match(/Text:\s*\"(.*?)\"/)[1];
      const padding = line.match(/Padding:\s*(\d+)/);
      const pad = padding ? padding[1] : 0;
      html += `<p style="padding:${pad}px;">${text}</p>`;
    }
    if (line.startsWith("Image:")) {
      const src = line.match(/Image:\s*\"(.*?)\"/)[1];
      const width = line.match(/Width:\s*(\d+)/);
      const w = width ? width[1] : 100;
      html += `<img src="${src}" width="${w}px" />`;
    }
    if (line.startsWith("Button:")) {
      const label = line.match(/Button:\s*\"(.*?)\"/)[1];
      const color = line.match(/Color:\s*\"(.*?)\"/);
      const c = color ? color[1] : 'blue';
      html += `<button style="background-color:${c};color:white;padding:10px;border:none;">${label}</button>`;
    }
  });

  html += '</div>';
  return html;
}