const {Router} = require('express');
const {check} = require('express-validator');
const { getUser,
        postUser,
        putUser,
    } = require('../controllers/user');
const router = Router();

const { validateFields} = require('../middlewares');

const { roleValidate,
        emailValidate,
        existUserById } = require('../helpers/database-validate');

router.get('/',getUser);
router.post('/',[
    check('firstName','First name is required').not().isEmpty(),
    check('lastName','Last name is required').not().isEmpty(),
    check('email').custom(emailValidate),
    check('password','Password required with 6 or more letters').isLength({min:6}),
    check('role').custom(roleValidate), 
    validateFields,
] ,postUser);
router.put('/:id',[
    check('id','invalid id').isMongoId(),
    check('id').custom(existUserById),
    check('password','Password required with 6 or more letters').isLength({min:6}),
    validateFields,
],
putUser);

module.exports = router;
