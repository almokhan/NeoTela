const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = 'C:/Users/Gamatech/Downloads/ANDON.DAT';
//const filePath = 'D:/MES GAMATECH/Labview/PULSE/ANDON.DAT';

// Função para ler o arquivo e processar os dados
function readFileData() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'latin1', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            let elementos = data.trim().split(',');
            
            function decimalToHex(decimal) {
                const hex = Number(decimal).toString(16);
                return '#' + '0'.repeat(Math.max(0, 6 - hex.length)) + hex;
            }
            
            elementos[40] = decimalToHex(elementos[40]);
            elementos[41] = decimalToHex(elementos[41]);
            elementos[38] = decimalToHex(elementos[38]);


            c = 0
          while(c <= 50){
          console.log(elementos[c])
          /c++
          } 
            
            resolve(elementos);
        });
    });
}


// Rota principal
router.get('/', async function(req, res, next) {
    try {
        const elementos = await readFileData();
        res.render('index', {
            title: 'NeoTela',
            favicon: '../public/favicon.png',
            elementos: elementos
        });
    } catch (error) {
        console.error('Erro na rota principal:', error);
        res.render('index', {
            title: 'NeoTela',
            favicon: '../public/favicon.png',
            elementos: [],
            error: error.message
        });
    }
});

// Nova rota para atualização dos dados via AJAX
router.get('/getData', async function(req, res) {
    try {
        const elementos = await readFileData();
        res.json({ elementos });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;