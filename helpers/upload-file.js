const { v4: uuidv4 } = require('uuid');
const path = require('path');


const uploadFile = ( files , extensionValidates = ['png','jpg','jpeg'], folder = '') => {
    
    return new Promise ((resolve,reject)=>{
        const {archivo} = files;
        const splitName = archivo.name.split('.')
        const extension = splitName[splitName.length - 1];
        const nameTemp = uuidv4() + '.' + extension;
        if(!extensionValidates.includes(extension)){
            reject(`The extension ${extension} not validate , ${extensionValidates}`)
        }
        uploadPath = path.join(__dirname ,'../uploads',folder,nameTemp);
        archivo.mv(uploadPath, (err) => {
            if (err){
                reject(err)
            }
            resolve(nameTemp)
        });
    });
}
module.exports = {
    uploadFile,
}