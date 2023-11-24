const express = require('express');
const { registrarUsuario, iniciarSesion } = require('../Controller/UsuarioController');
const { protegerRutas } = require('../Middleware/protegerRutas');

const router = express.Router();

router.post('/register', registrarUsuario);

router.post('/login', iniciarSesion);

router.get('/rutaProtegida', protegerRutas, (req, res) => {
  res.json({ mensaje: 'Acceso autorizado. Bienvenido.' });
});

module.exports = router;
