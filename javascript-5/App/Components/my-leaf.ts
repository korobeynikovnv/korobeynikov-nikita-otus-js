import { LitElement, html, property, customElement } from 'lit-element';
import { MyNode } from '../Models/tree-node';


export class MyLeaf extends LitElement {

	private Id : String;

	private Items : Array<MyLeaf>;

	static get properties() {
		return {
		  Id: {type: String},
		  Items: {type: Array},
		};
	  }

    constructor(){
		super();
		this.Id = 'default';
		/** @type {MyNode[]} */
		this.Items = [];
	}

    render(){
        return html`        
			<li class="leaf">
				<span>${this.Id}</span>
				<ul>
					${this.Items.map(i => html`<my-leaf id="${i.Id}" .items="${i.Items}"></my-leaf>`)}
				</ul>
			</li>
        `;
        
    }
}

customElements.define('my-leaf', MyLeaf);