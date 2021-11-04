// Declaracion de requires
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

//Variable para almacenar conersaciones anteriores
const conv = [];

//Coger index.html
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//Chatbot por si solo
function chatbot(mensaje) {
  mensaje = mensaje.toUpperCase();

  switch (mensaje) {
    case 'HOLA':
      return 'Hola! Este es un chatbot de testes hecho por Samuel Abade! diga Test para saber más';
      break;
    case 'TEST':
      return 'Este test está diseñado como prueba para el bot4testing. Esta conversación se ha acabado! muchas gracias!';
      break;
    default:
      return 'No te entiendo! diga hola para empezar.';
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
});

app.get('/', function (req, res) {
  res.render(__dirname + '/public/index.html', {
    conversacion: conv,
  });
});

app.listen(8000, () => {
  console.log('Server funciona');
});
