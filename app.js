const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// Declaração de variáveis
const PORT = process.env.PORT || 3000;

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const indexRouter = require('./routes/index'); // Rota para o arquivo index

// Indicação das rotas
app.use('/', indexRouter);

// Ouve a porta para o browser
app.listen(PORT, () => {
  console.log(`Servidor rodando http://127.0.0.1:${PORT}`);
});

// Exporta o obj app
module.exports = app;