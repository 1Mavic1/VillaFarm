const {Router} = require('express');
const {check} = require('express-validator');
const { validateJWT,validateFields } = require('../middlewares');
const { existPublicationById, existComment } = require('../helpers/database-validate');
const { getComments,getComment, createComment, updateComment, deleteComment} = require('../controllers/comment');

const router = Router();

// Obtener todas las publicaciones del marketplace - publico
router.get('/',[
    check('publication','invalid id').isMongoId(),
    check('publication').custom(existPublicationById),
    validateFields,
],getComments);
// Obtener -publicacion por id

router.get('/:id',[
    check('id','invalid id').isMongoId(),
    check('id').custom(existComment),
    validateFields
],getComment);

// Crear publicacion en el marketplace - privado - cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('description','Description is required').not().isEmpty(),
    validateFields
],createComment);
// Actualizar privado - cualquiera con token valido

router.put('/:id',[
    // no mandamos mas validaciones porque tal vez no se quiere actualizar las demas propiedades
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existComment),
    check('description','Description is required').not().isEmpty(),
    validateFields
],updateComment)

// // Borrar un producto

router.delete('/:id',[
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existComment),
    validateFields,
],deleteComment)

module.exports = router;
