const express = require('express')
const cors = require('cors');

const { socketController } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );
        this.path = {}


        // Middlewares
        this.middlewares();


        this.routes();

        this.sockets();
    }


    middlewares() {

        this.app.use( cors() )

        // Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        // this.app.use(this.path.auth, require('../routes/auth'))
    }

    sockets() {

        this.io.on("connection", socketController)

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }


}


module.exports = Server;