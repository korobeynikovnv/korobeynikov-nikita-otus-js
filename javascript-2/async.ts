/**
 * Функция-агрегатор для работы с результатом нескольких async-функций
 * @param {Promise[]} asyncFunctions Promise-ы результат которых необходимо агрегировать
 * @param {Function} reduce - callback-функция, выполняющая агрегацию. Принимает результат очередной {@link asyncFunctions} и сохраненный результат
 * @param {string| number} initialValue - значение для первого вызова {@link reduce}
 * @returns {Promise<string| number>}
 */
async function promiseReduce(asyncFunctions : Promise<string| number>[], reduce : Function, initialValue : string| number){
    let currentValue : string| number = initialValue;
    
    for (let asyncFunction of asyncFunctions){
        try {
			let promise : Promise<string| number> = asyncFunction; 
			let promiseValue =  await promise;
			currentValue = reduce(promiseValue, currentValue);
			
        } catch (error) {
            console.info(error);
        }
    }

    return Promise.resolve(currentValue);
}