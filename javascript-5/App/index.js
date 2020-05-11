import { render } from 'lit-html';
import { MyTree } from './Components/my-tree';
import { MyNode } from './Models/tree-node';
import { MyLeaf } from './Components/my-leaf';

/**
 * Как будто мы получили их динамически
 * @type {Array<MyNode>}
 */
const DATA = [{
    "id": 1,
    "items": [{
		"id": 2,
		"items": [{ "id": 3, items: [] }]
		}]
	},
 {
	 "id":4,
	 "items" : [],
 },{
	 "id": 5,
	"items": [{
		"id":6,
		items:[]
	}]
 }];

/** @type {MyTree} */
const TREE = document.querySelector('#root');
TREE.items = DATA;
TREE.render();