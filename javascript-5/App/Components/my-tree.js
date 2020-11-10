import { LitElement, html, property, customElement } from 'lit-element';
import { MyNode } from '../Models/tree-node';

export class MyTree extends LitElement {

	static get properties() {
		return {
		  Id: {type: String},
		  Items : {type : Array}
		};
	  }

    constructor(){
		super();
		
		/** @type {MyNode[]} */
		this.Items = [];
		/** @type {String} */
		this.Id = 'Default';
    }

    render(){
		return html`
		<div class="my-tree">
            <div>${this.Id}</div>
            <ul class="root">
                ${this.Items.map(n => html`<my-leaf id="${n.id}" .items="${n.items}"></my-leaf>`)}
            </ul>
        </div>`;
    }
}

customElements.define('my-tree', MyTree);