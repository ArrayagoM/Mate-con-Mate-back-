const mongoose = require('mongoose');

const connect = async () => {
  try {
    const uri = process.env.MONGO_DB;
    const opciones = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, opciones);
    console.log('Conexión a la base de datos establecida correctamente');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = { connect };
