const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

// Configuração do axios
const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Accept': 'application/xml'
  },
  responseType: 'text'
});

// Função para converter XML para JSON
function xmlToJson(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Função para processar os dados do LabVIEW
function processLabVIEWData(data) {
  const response = data.Response;
  const result = {
    timeString: '',
    aprovadosPLC: 0,
    arrayColors: [],
    arrayValues: []
  };

  response.Terminal.forEach(terminal => {
    switch(terminal.Name) {
      case 'time string':
        result.timeString = terminal.Value;
        break;
      case 'Aprovados PLC':
        result.aprovadosPLC = parseInt(terminal.Value);
        break;
      case 'Array Colors':
        result.arrayColors = terminal.Value.Value.map(v => parseInt(v));
        break;
      case 'ANDON Array Values':
        result.arrayValues = terminal.Value.Value;
        break;
    }
  });

  return result;
}

// Função para obter dados do LabVIEW
async function getLabVIEWData() {
  try {
    const response = await axiosInstance.get('http://127.0.0.1:8080/WebService1/HTTP_ANDON');
    console.log('Dados XML recebidos do LabVIEW:', response.data);
    
    const jsonData = await xmlToJson(response.data);
    console.log('Dados convertidos para JSON:', JSON.stringify(jsonData, null, 2));

    return processLabVIEWData(jsonData);
  } catch (error) {
    throw new Error(`Erro ao obter dados do LabVIEW: ${error.message}`);
  }
}

// Rota principal
router.get('/', async function(req, res, next) {
  try {
    const labviewData = await getLabVIEWData();
    
    res.render('index', { 
      title: 'NeoTela',
      favicon: '../public/favicon.png',
      labviewData: labviewData.arrayValues,
      timeString: labviewData.timeString,
      aprovadosPLC: labviewData.aprovadosPLC,
      arrayColors: labviewData.arrayColors
    });
  } catch (error) {
    console.error('Erro na rota principal:', error);
    res.render('index', { 
      title: 'NeoTela',
      favicon: '../public/favicon.png',
      labviewData: [],
      timeString: '',
      aprovadosPLC: 0,
      arrayColors: [],
      error: 'Erro ao carregar dados do servidor'
    });
  }
});

// Rota para atualização de dados
router.get('/atualizar-dados', async function(req, res) {
  try {
    const labviewData = await getLabVIEWData();
    
    res.json({
      labviewData: labviewData.arrayValues,
      timeString: labviewData.timeString,
      aprovadosPLC: labviewData.aprovadosPLC,
      arrayColors: labviewData.arrayColors
    });
  } catch (error) {
    console.error('Erro na atualização:', error);
    res.status(500).json({ 
      error: 'Erro ao atualizar dados',
      message: error.message 
    });
  }
});

module.exports = router;