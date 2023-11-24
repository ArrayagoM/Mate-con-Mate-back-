const Joi = require('joi');
const Usuario = require('../Model/Usuario');
const Posteo = require('../Model/Posteo');
const Comentario = require('../Model/Comentario');
const Imagen = require('../Model/Imagen');

const validarSolicitud = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error.details[0].message });
  }
  next();
};

const posteoConImagenSchema = Joi.object({
  propietarioId: Joi.string().required(),
  titulo: Joi.string().required(),
  contenido: Joi.string().required(),
  imagenUrl: Joi.string().uri().required(),
});

exports.crearPosteoConImagen = [
  validarSolicitud(posteoConImagenSchema),
  async (req, res) => {
    try {
      const { propietarioId, titulo, contenido, imagenUrl } = req.body;

      const propietario = await Usuario.findById(propietarioId);
      if (!propietario) {
        return res.status(404).json({ mensaje: 'Propietario no encontrado' });
      }

      const nuevoPosteo = await Posteo.create({ propietario: propietarioId, titulo, contenido });

      const nuevaImagen = await Imagen.create({ propietario: propietarioId, URI: imagenUrl });
      nuevoPosteo.imagenes.push(nuevaImagen._id);

      await nuevoPosteo.save();

      return res.status(201).json(nuevoPosteo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al crear el posteo con imagen' });
    }
  },
];

const comentarioSchema = Joi.object({
  propietarioId: Joi.string().required(),
  posteoId: Joi.string().required(),
  contenido: Joi.string().required(),
});

exports.dejarComentario = [
  validarSolicitud(comentarioSchema),
  async (req, res) => {
    try {
      const { propietarioId, posteoId, contenido } = req.body;

      const propietario = await Usuario.findById(propietarioId);
      const posteo = await Posteo.findById(posteoId);

      if (!propietario || !posteo) {
        return res.status(404).json({ mensaje: 'Propietario o posteo no encontrado' });
      }

      const nuevoComentario = await Comentario.create({ contenido });
      posteo.comentarios.push(nuevoComentario._id);

      await posteo.save();

      return res.status(201).json(nuevoComentario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al dejar el comentario' });
    }
  },
];
exports.obtenerTodosLosPosteos = async (req, res) => {
  try {
    const posteos = await Posteo.find();

    const posteosDetallados = await Promise.all(
      posteos.map(async (posteo) => {
        const propietario = await Usuario.findById(posteo.propietario);

        const comentarios = await Comentario.find({ _id: { $in: posteo.comentarios } });

        const imagenes = await Imagen.find({ _id: { $in: posteo.imagenes } });

        return {
          _id: posteo._id,
          titulo: posteo.titulo,
          contenido: posteo.contenido,
          propietario: {
            _id: propietario._id,
            name: propietario.name,
          },
          comentarios,
          imagenes,
        };
      })
    );

    return res.status(200).json(posteosDetallados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener los posteos' });
  }
};
