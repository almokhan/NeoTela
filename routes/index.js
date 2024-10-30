const express = require('express');
const router = express.Router();
const fs = require('fs');

// Função para ler e processar o arquivo
const filePath = 'C:/Users/Gamatech/Downloads/ANDON.DAT'; // Altere para o caminho correto do seu arquivo

// Rota principal
router.get('/', function(req, res, next) {
  // Variável para armazenar os elementos
  let elementos = []; // Inicializa como array vazio

  try {
    // Lê o arquivo e processa os dados
    fs.readFile(filePath, 'latin1', (err, data) => {
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
        elementos = data.trim().split(','); // Divisão por virgulas

       
       

      
      function decimalToHex(decimal) { //Tranforma decimais em hexadecimais
        const hex = Number(decimal).toString(16);
        return '#' + '0'.repeat(Math.max(0, 6 - hex.length)) + hex;
    }
      elementos[40]= decimalToHex(elementos[40]);
      elementos[41]= decimalToHex(elementos[41]);
      //c=0
      //while(c<50){
        //console.log(elementos[c])
        //c++
     // }
 

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
