const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
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

app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando http://127.0.0.1:${PORT}`);
});




