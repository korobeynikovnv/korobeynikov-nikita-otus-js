/**
 * Получить уникальный css селектор для элемента
 * @param {HTMLElement} element 
 * @returns {string} 
 */
function getPath(element){

    /**
     * 
     * @param {Array<string>} cssSelector 
     */
    let isUnique = function(cssSelector){
        return document.querySelectorAll(cssSelector.join('')).length === 1;
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @returns {Array<String>} selectors
     */
    let selectorsGenerator = function* (element){
        
        if (element.id){
            yield `#${element.id}`;
        }
        
        //класс объекта
        for (let i = 0; i < element.classList.length; i++){
            let value = element.classList[i];
            yield `.${value}`;
        }

        yield element.localName;
    }

    /**
     * 
     * @param {GeneratorFunction} generator 
     * @return {boolean}
     */
    let itterateGenerator = function (generator){
        while(true){
        
            let selectors = generator.next().value;
    
            if (!selectors){
                return false;
            }
    
            result.splice(0,0, selectors);
            if (isUnique(result)){
                return result;
            }
    
        }
    }

    let result = [];

    //Проверяем на уникальность селекторов сам элемент
    let elemGenerator = selectorsGenerator(element);    
    if (itterateGenerator(elemGenerator)){
        return result.join('');
    }

    //Добавляем родительский селектор
    result.splice(0,0, ' > ');

    //Проверяем вместе с родительским элементом
    let parentGenerator = selectorsGenerator(element.parentElement);
    if (itterateGenerator(parentGenerator)){
        return result;
    }

    throw new Error('Не удалось найти уникальный css-селектор');
}