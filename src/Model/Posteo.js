const mongoose = require('mongoose');

const posteoSchema = new mongoose.Schema({
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  meGustas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
  ],
  comentarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comentario',
    },
  ],
  imagenes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Imagen',
    },
  ],
});

const Posteo = mongoose.model('Posteo', posteoSchema);

module.exports = Posteo;
