/**
 * Получить уникальный css селектор для элемента
 * @param {HTMLElement} element 
 * @returns {string} 
 */
function getPath(element : HTMLElement): string{

    /**
     * 
     * @param {string[]} cssSelector 
     */
    let isUnique = function(cssSelector : string[]) : boolean{
        return document.querySelectorAll(cssSelector.join('')).length === 1;
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @returns {string[]} selectors
     */
    let selectorsGenerator = function* (element) : Generator<string>{
        
        if (element.id){
            yield `#${element.id}`;
        }
        
        //класс объекта
        for (let i = 0; i < element.classList.length; i++){
            let value : string = element.classList[i];
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

    let result : string[] = [];

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
        return result.join('');
    }

    throw new Error('Не удалось найти уникальный css-селектор');
}