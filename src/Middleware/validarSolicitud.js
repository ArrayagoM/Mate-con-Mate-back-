
const validarSolicitud = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error.details[0].message });
  }
  next();
};

module.exports = validarSolicitud;
