const Joi = require('joi');
const Usuario = require('../Model/Usuario');
const validarSolicitud = require('../Middleware/validarSolicitud');

const registroUsuarioSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
});

exports.registrarUsuario = [
  validarSolicitud(registroUsuarioSchema),
  async (req, res) => {
    try {
      const { name, password } = req.body;

      const existeUsuario = await Usuario.exists({});

      if (existeUsuario) {
        return res.status(400).json({ mensaje: 'Ya existe un usuario registrado.' });
      }

      
      const nuevoUsuario = new Usuario({ name, password });
      await nuevoUsuario.save();

      
      const token = nuevoUsuario.generarToken();

      return res.status(201).json({ mensaje: 'Usuario registrado con éxito.', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
    }
  },
];

exports.iniciarSesion = [
  validarSolicitud(registroUsuarioSchema),
  async (req, res) => {
    try {
      const { name, password } = req.body;

      const usuario = await Usuario.findOne({ name });

      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      const contraseñaValida = await usuario.compararContraseña(password);

      if (!contraseñaValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      const token = usuario.generarToken();

      res.cookie('token', token, { httpOnly: true });

      return res.status(200).json({ mensaje: 'Inicio de sesión exitoso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al iniciar sesión.' });
    }
  },
];
