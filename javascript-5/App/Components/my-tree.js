import { LitElement, html, property, customElement } from 'lit-element';
import { MyNode } from '../Models/tree-node';

export class MyTree extends LitElement {

	static get properties() {
		return {
		  id: {type: String},
		  items : {type : Array}
		};
	  }

    constructor(){
		super();
		
		/** @type {MyNode[]} */
		this.items = [];
		/** @type {String} */
		this.id = 'Default';
    }

    render(){
		return html`
		<div class="my-tree">
            <div>${this.id}</div>
            <ul class="root">
                ${this.items.map(n => html`<my-leaf id="${n.id}" .items="${n.items}"></my-leaf>`)}
            </ul>
        </div>`;
    }
}

customElements.define('my-tree', MyTree);