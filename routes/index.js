const express = require('express');
const router = express.Router();
const fs = require('fs');

// Função para ler e processar o arquivo
const filePath = 'D:/MES GAMATECH/Labview/PULSE/ANDON.DAT'; // Altere para o caminho correto do seu arquivo

// Rota principal
router.get('/', function(req, res, next) {
  // Variável para armazenar os elementos
  let elementos = []; // Inicializa como array vazio

  try {
    // Lê o arquivo e processa os dados
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return res.render('index', {
          title: 'NeoTela',
          favicon: '../public/favicon.png',
          elementos: [],
          error: 'Erro ao carregar os dados do arquivo.'
        });
      } else {
        // Dividir o conteúdo do arquivo em elementos, separados por tabulação ou espaço
        elementos = data.trim().split(','); // Divisão por espaços ou tabulações

       
       
        if (String(elementos[2]).includes('1')) { //Arruma Problemas de codificação do caractere º
          elementos[50] = '1º Turno';
      } else if (String(elementos[2]).includes('2')) {
          elementos[50] = '2º Turno';
      }
      
      function decimalToHex(decimal) { //Tranforma decimais em hexadecimais
        const hex = Number(decimal).toString(16);
        return '#' + '0'.repeat(Math.max(0, 6 - hex.length)) + hex;
    }
      elementos[40]= decimalToHex(elementos[40]);
      elementos[41]= decimalToHex(elementos[41]);

      c = 0
      while (c <= 50){  // Exibe o conteúdo do array elementos no console
        console.log(c,elementos[c])
        c = c+1
      }
 

        // Renderiza a view com os dados lidos
      
        res.render('index', { 
          title: 'NeoTela',
          favicon: '../public/favicon.png',
          elementos: elementos // Passa o array de elementos para a view
        });
      }
    });
  } catch (error) {
    console.error('Erro na rota principal:', error);
    res.render('index', { 
      title: 'NeoTela',
      favicon: '../public/favicon.png',
      elementos: [], // Passa um array vazio em caso de erro
      error: error.message
    });
  }
});

module.exports = router;
