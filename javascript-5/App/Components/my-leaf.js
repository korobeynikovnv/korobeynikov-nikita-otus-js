import { LitElement, html, property, customElement } from 'lit-element';
import { MyNode } from '../Models/tree-node';


export class MyLeaf extends LitElement {

	static get properties() {
		return {
		  id: {type: String},
		  items: {type: Array},
		};
	  }

    constructor(){
		super();
		this.id = 'default';
		/** @type {MyNode[]} */
		this.items = [];
	}

    render(){
        return html`        
			<li class="leaf">
				<span>${this.id}</span>
				<ul>
					${this.items.map(i => html`<my-leaf id="${i.id}" .items="${i.items}"></my-leaf>`)}
				</ul>
			</li>
        `;
        
    }
}

customElements.define('my-leaf', MyLeaf);