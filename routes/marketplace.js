const {Router} = require('express');
const {check} = require('express-validator');
const { validateJWT,validateFields } = require('../middlewares');

const { existMarketplace } = require('../helpers/database-validate');
const { getMarketplaces, createMarketplace, updateMarketplace, deleteMarketplace, getMarketplace } = require('../controllers/marketplace');

const router = Router();

// Obtener todas las publicaciones del marketplace - publico
router.get('/',[
    check('type','Type is required').not().isEmpty(),
    validateFields,
],getMarketplaces);
// Obtener -publicacion por id
router.get('/:id',[
    check('id','invalid id').isMongoId(),
    check('id').custom(existMarketplace),
    validateFields
],getMarketplace);
// Crear publicacion en el marketplace - privado - cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('description','Name is required').not().isEmpty(),
    validateFields
],createMarketplace);
// Actualizar privado - cualquiera con token valido
router.put('/:id',[
    // no mandamos mas validaciones porque tal vez no se quiere actualizar las demas propiedades
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existMarketplace),
    validateFields
],updateMarketplace)
// Borrar un producto
router.delete('/:id',[
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existMarketplace),
    validateFields,
],deleteMarketplace)
module.exports = router;
