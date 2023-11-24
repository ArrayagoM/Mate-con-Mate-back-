const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
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
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
