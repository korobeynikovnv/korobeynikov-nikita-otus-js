let buys : string[][] = [["a", "b"], ["a", "c"], ["d", "e"]];

maxItemAssociation(buys);

/**
 * Найти максимальную рекомендация среди всех покупок пользователя
 * @param {string[][]} buys
 * @return {string[]}
 */
function maxItemAssociation(buys : string[][]) : string[]{

	/**
	 * Получить группу рекомендация для конкретного продукта
	 * @param {string} compared продукта для поиска
	 * @param {string[][]} buys все покупки пользователя
	 * @returns {string[]} все связанные продукты
	 */
	let getAssociation = function(compared : string, buys : string[][]) : string[]{

		let association = [];

		for (let buy of buys){

			let isBuyMarked = false;

			for (let item of buy){
				if (item === compared){
					isBuyMarked = true;
				}

				if (isBuyMarked && !association.includes(item)){
					association.push(item);
				}
			}
		}

		return association;
	}


	let maxAssociation = [];
	let checkedItems = []
	for(let buy of buys){
		for (let item of buy){

			//Исключить повторные проверки продуктов
			if (checkedItems.includes(item)){
				continue;
			}

			let associaton = getAssociation(item, buys);
			if (associaton.length > maxAssociation.length){
				maxAssociation = associaton;
			}
			
			checkedItems.push(item);
		}
	}

	return maxAssociation;
}
