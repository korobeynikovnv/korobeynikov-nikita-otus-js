/**
 * Функция-агрегатор для работы с результатом нескольких async-функций
 * @param {Array<Promise>} asyncFunctions Promise-ы результат которых необходимо агрегировать
 * @param {Function} reduce - callback-функция, выполняющая агрегацию. Принимает результат очередной {@link asyncFunctions} и сохраненный результат
 * @param {any} initialValue - значение для первого вызова {@link reduce}
 * @returns {Promise}
 */
async function promiseReduce(asyncFunctions : Array<Promise<any>>, reduce : Function, initialValue : any){
    let currentValue : any = initialValue;
    
    for (var i = 0; i < asyncFunctions.length; i++){
        try {
			var promise : Promise<any> = asyncFunctions[i];        
			currentValue = promise
				.then((promiseValue) => reduce(promiseValue, currentValue))
        } catch (error) {
            console.info(error);
        }
    }

    return Promise.resolve(currentValue);
}