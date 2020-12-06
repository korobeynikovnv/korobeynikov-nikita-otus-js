/**
 * Цикличное суммирование. Без параметров - накопленный результат
 * @param {number|undefined} value Число для сложения
 * @returns {number|function} Накопленный результат или продолжение цикла
 */
var sum = function (value : number | undefined) : number | Function{    

    let add = function(value) : number | Function{

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
    
    return add(undefined);
}
