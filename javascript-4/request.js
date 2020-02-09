const SimpleServer = require('./Server');
const http = require('http');

const testPort = 3200;
const testHostname = '127.0.0.1';

/**
 * Отправить тестовые запросы на сервер
 * @param {number} amount количество запросов
 * @param {boolean} isAsync Являются ли запросы асинхронными
 */
async function request (amount, isAsync = false){

    let testPath = `http://${testHostname}:${testPort}`;

    let promiseRequest = function (testPath, i) {
        return new Promise((resolve, reject) => {
            http.get(testPath, (res) => {
                console.log(`Успешно обработан запрос ${i}`);
                resolve(true);
            });
        });
    };

    if (!(typeof amount === 'number'))
        throw new Error('Должно amount быть числом');

    for (let i = 0; i < amount; i++){
        console.log(`Запускаем ${i}-ый запрос ${isAsync ? 'асинхронно' : 'синхронно' }`);
        if (isAsync)
            promiseRequest(testPath, i);
        else
            await promiseRequest(testPath, i);
    }
}


const server = new SimpleServer(testPort, testHostname);
server.start()
    .then(() => request(1, false))
    .then(() => request(10, true))
    .then(() => request(40, false))
    .catch(error => console.log(error));

