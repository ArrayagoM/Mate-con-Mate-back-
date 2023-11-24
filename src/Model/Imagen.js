const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  URI: {
    type: String,
    required: true,
  },
});

const Imagen = mongoose.model('Imagen', imagenSchema);

module.exports = Imagen;
