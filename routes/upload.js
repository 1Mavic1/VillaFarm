const {Router} = require('express');
const {check} = require('express-validator');
const { showImage, uploadImageCloudinary } = require('../controllers/upload');
const { validateFields,validateFile } = require('../middlewares');
const {allowedCollections} = require('../helpers');

const router = Router();
router.put('/:collection/:id',[
    validateFile,
    check('id','id mongo not validate').isMongoId(),
    check('collection').custom(c=> allowedCollections(c,['users','products'])),
    validateFields,
],uploadImageCloudinary)

router.get('/:collection/:id',[
    check('id','id mongo not validate').isMongoId(),
    check('collection').custom(c=> allowedCollections(c,['users','products'])),
    validateFields,
],showImage)

module.exports = router;
