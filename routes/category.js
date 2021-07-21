const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields} = require('../middlewares');
const { 
        getCategory,
        getCategorys,
      } = require('../controllers/category');
const { existCategory } = require('../helpers/database-validate');

const router = Router();

// Obtener todas las categorias - publico
router.get('/',getCategorys);
// Obtener categoria por id
router.get('/:id',[
    check('id','invalid id').isMongoId(),
    check('id').custom(existCategory),
    validateFields
],getCategory);

module.exports = router;
