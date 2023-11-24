const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

usuarioSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

usuarioSchema.methods.compararContraseña = function (contraseña) {
  return bcrypt.compare(contraseña, this.password);
};

usuarioSchema.methods.generarToken = function () {
  return jwt.sign({ id: this._id, name: this.name }, 'secretojwt', { expiresIn: '1h' });
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
