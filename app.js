const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// Declaração de variáveis
const PORT = process.env.PORT || 3000;

// Configuração do Handlebars
const hbs = exphbs.create({
  helpers: {
    json: function(context) {
      return JSON.stringify(context);
    }
  }
});

// Adiciona middleware para parsing de JSON
app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const indexRouter = require('./routes/index');

// Indicação das rotas
app.use('/', indexRouter);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Ouve a porta para o browser
app.listen(PORT, () => {
  console.log(`Servidor rodando http://127.0.0.1:${PORT}`);
});

// Exporta o obj app
module.exports = app;