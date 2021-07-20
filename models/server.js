require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            authPath : '/api/auth',
            userPath : '/api/user',
        }
        //connect database
        this.dbConnect();
        //middlewars
        this.middlewars();
        //routes my app
        this.routes();
    }
    async dbConnect(){
        await dbConnection();
    }
    middlewars(){
        // CORS
        this.app.use(cors());
        //Lectura y parseo del json
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
         // upload files
         this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));
    }
    routes(){
        this.app.use(this.paths.authPath,require('../routes/auth'));
        this.app.use(this.paths.userPath,require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Deploying in the port ',this.port);
        })
    }
}
 module.exports = Server;