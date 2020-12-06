import { http } from 'http';
const defaultHostname = '127.0.0.1';
const defaultPort = 3000

/**
 * Простой сервер отдающий текст с задержкой
 */
export class Server {

	private Port : number;

	private HostName : string;

	private Server : http.Server

    /**
     * Данные для прослушивания
     * @param {number} port 
     * @param {string} hostname 
     */
    constructor(port : number, hostname : string){
        this.Port = port || defaultPort;
        this.HostName = hostname || defaultHostname;
        this.Server = http.createServer();
    }

    /**
     * Запустить сервер
     * @returns Promise<true>
     */
    start() : Promise<boolean>{      

        return new Promise((resolve, reject) => {
            let timeOut = function(timeout){
                return new Promise(function(resolve, reject){
                    setTimeout(() => resolve(true), timeout);
                });
            }
    
            this.Server.on('request', async (req, res) => {
                await timeOut(100);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Success!\n');
            });
    
            this.Server.listen(this.Port, `${this.HostName}`, () => {
                console.log(`Server started at http://${this.hostname}:${this.port}/`);
                resolve(true);
            });
        });
    }
}