const {Router} = require('express');
const {check} = require('express-validator');
const { validateJWT,validateFields } = require('../middlewares');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { existProduct } = require('../helpers/database-validate');

const router = Router();

// Obtener todos los productos - publico
router.get('/',getProducts);
// Obtener -producto por id
router.get('/:id',[
    check('id','invalid id').isMongoId(),
    check('id').custom(existProduct),
    validateFields
],getProduct);
// Crear producto - privado - cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    validateFields
],createProduct);
// Actualizar privado - cualquiera con token valido
router.put('/:id',[
    // no mandamos mas validaciones porque tal vez no se quiere actualizar las demas propiedades
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existProduct),
    validateFields
],updateProduct)
// Borrar un producto
router.delete('/:id',[
    validateJWT,
    check('id','invalid id').isMongoId(),
    check('id').custom(existProduct),
    validateFields,
],deleteProduct)
module.exports = router;
