const cors = require('cors');

const whitelist = ['http://localhost:3000', 'http://localhost:3001']; // Lista de domínios permitidos
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  const origin = req.get('Origin');
  if (whitelist.indexOf(origin) !== -1) {
    corsOptions = { origin: true }; // Permite o domínio da whitelist
  } else {
    corsOptions = { origin: false }; // Bloqueia outros domínios
  }

  callback(null, corsOptions);
};

exports.corsWithOptions = cors(corsOptionsDelegate); // Exporta a configuração do CORS
