const databaseValidate = require('./database-validate');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...databaseValidate,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile,
}