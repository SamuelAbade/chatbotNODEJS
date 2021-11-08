// Declaracion de requires
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

//Variable para almacenar conersaciones anteriores
const conv = [];

//Ver si es la primera vez:
var primeraVez = false;

// almacenar nombre del usuario
var nombreuser = '';

//Enviar mensaje de bienvenida + Reiniciar el bot si la pagina es recargada
app.get('/', function (req, res) {
  primeraVez = true;
  conv.length = 0;

  const msg = 'Bot: Bienvenido al bot! Cuál es tu nombre?';
  conv.push(msg);

  res.render(__dirname + '/public/index.html', {
    conversacion: conv,
  });
});

//Coger index.html
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//Chatbot por si solo
function chatbot(mensaje) {
  if (primeraVez) {
    nombreuser = mensaje;
  }

  mensaje = mensaje.toUpperCase();

  switch (mensaje) {
    case 'HOLA':
      return 'Hola! Este es un chatbot de testes hecho por Samuel Abade! diga Test para saber más';
      break;
    case 'TEST':
      return 'Este test está diseñado como prueba para el bot4testing. Esta conversación se ha acabado! muchas gracias!';
      break;
    default:
      if (primeraVez) {
        return 'Es un placer conocerte, ' + nombreuser;
      } else {
        return 'No te entiendo! diga hola para empezar.';
      }
      break;
  }
}

app.post('/', (req, res) => {
  const usertext = req.body.input;
  const botresp = chatbot(usertext);

  const userfinal = 'Tú: ' + usertext;
  const botfinal = 'Bot: ' + botresp;

  //almacenar conversacion antigua
  conv.push(userfinal, botfinal);

  res.render(__dirname + '/public/index.html', {
    conversacion: conv,
  });

  primeraVez = false;
});

app.listen(8000, () => {
  console.log('Server funciona');
});
