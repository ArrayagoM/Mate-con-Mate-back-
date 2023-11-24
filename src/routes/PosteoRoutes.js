const { Router } = require('express');
const router = new Router();
const PosteoController = require('../Controller/crud');

router.post('/crear-con-imagen', PosteoController.crearPosteoConImagen);
router.post('/dejar-comentario', PosteoController.dejarComentario);
router.get('/obtener-todos', PosteoController.obtenerTodosLosPosteos);

module.exports = router;
