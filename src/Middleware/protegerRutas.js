const jwt = require('jsonwebtoken');

exports.protegerRutas = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const usuarioVerificado = jwt.verify(token, 'secretojwt');

    req.usuario = usuarioVerificado;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Token inválido.' });
  }
};
