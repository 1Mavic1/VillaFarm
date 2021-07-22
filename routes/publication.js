const {Router} = require('express');
const {check} = require('express-validator');
const { validateJWT,validateFields } = require('../middlewares');

const { existPublicationById, existUserById } = require('../helpers/database-validate');
const { getPublications,createPublication, getPublication, updatePublication, deletePublication } = require('../controllers/publication');

const router = Router();

// Obtener todas las publicaciones del marketplace - publico
router.get('/',[
    check('postuser','invalid id').isMongoId(),
    check('postuser').custom(existUserById),
    validateFields,
],getPublications);
// Obtener -publicacion por id

router.get('/:id',[
    check('id','invalid id').isMongoId(),
    check('id').custom(existPublicationById),
    validateFields
],getPublication);

// Crear publicacion en el marketplace - privado - cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('description','Description is required').not().isEmpty(),
    validateFields
],createPublication);
// Actualizar privado - cualquiera con token valido

router.put('/:id',[
    // no mandamos mas validaciones porque tal vez no se quiere actualizar las demas propiedades
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existPublicationById),
    validateFields
],updatePublication)

// Borrar un producto

router.delete('/:id',[
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existPublicationById),
    validateFields,
],deletePublication)

module.exports = router;
