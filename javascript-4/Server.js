const http = require('http');
const defaultHostname = '127.0.0.1';
const defaultPort = 3000

/**
 * Простой сервер отдающий текст с задержкой
 */
module.exports = class Server {
    /**
     * Данные для прослушивания
     * @param {number} port 
     * @param {string} hostname 
     */
    constructor(port, hostname){
        this.port = port || defaultPort;
        this.hostname = hostname || defaultHostname;
        this.server = http.createServer();
    }

    /**
     * Запустить сервер
     * @returns Promise<true>
     */
    start(){      

        return new Promise((resolve, reject) => {
            let timeOut = function(timeout){
                return new Promise(function(resolve, reject){
                    setTimeout(() => resolve(true), timeout);
                });
            }
    
            this.server.on('request', async (req, res) => {
                await timeOut(100);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Success!\n');
            });
    
            this.server.listen(this.port, `${this.hostname}`, () => {
                console.log(`Server started at http://${this.hostname}:${this.port}/`);
                resolve(true);
            });
        });
    }
}