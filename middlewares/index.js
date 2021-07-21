const validateFields  = require('../middlewares/validate-fields');
const validateFile = require('../middlewares/validate-file')
const validateJWT = require('../middlewares/validate-jwt');
module.exports = {
    ... validateFields,
    ... validateFile,
    ... validateJWT,
}