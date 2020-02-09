/**
 * Цикличное суммирование. Без параметров - накопленный результат
 * @param {Number|undefined} number Число для сложения
 * @returns {Number|function} Накопленный результат или продолжение цикла
 */
var sum = function (value){    

    let add = function(value){

        if (!arguments.length){
            return totalCount;
        }
        
        if (typeof value !== 'number') {
            throw new Error(`"${value}" - не является числом`);
        }

        totalCount  = totalCount + value;
        
        return add;
    };

    let totalCount = 0;
    
    if (arguments.length)
        return add(value);
    
    return add();
}
