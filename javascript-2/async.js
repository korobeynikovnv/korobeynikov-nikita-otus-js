/**
 * Функция-агрегатор для работы с результатом нескольких async-функций
 * @param {Array<Promise>} asyncFunctions Promise-ы результат которых необходимо агрегировать
 * @param {Function} reduce - callback-функция, выполняющая агрегацию. Принимает результат очередной {@link asyncFunctions} и сохраненный результат
 * @param {any} initialValue - значение для первого вызова {@link reduce}
 * @returns {Promise}
 */
async function promiseReduce(asyncFunctions, reduce, initialValue){
    let currentValue = initialValue;
    
    for (var i = 0; i < asyncFunctions.length; i++){
        try {
        var promise = asyncFunctions[i];        
        currentValue = await promise()
            .then((promiseValue) => reduce(promiseValue, currentValue))
            // .catch((error) => console.info(error)); Пришлось убрать т.к. не отлавливает exception-ы
        } catch (error) {
            console.info(error);
        }
    }

    return Promise.resolve(currentValue);
}