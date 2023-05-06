import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import Page from "../Page";
import { appRouter } from "../../../static";
// import { render } from "../../services/RenderDom";

interface abstract {}

export class Page500 extends Page {
	constructor(props: abstract) {
		const data = {
			errorMessage: "Мы уже фиксим",
			styles
		};
		super("main", { ...props, ...data });
	}

	render() {
		return this.compile(tpl, this.props);
	}

	postRender() {
		const parents = this._element.children;
		const pArray = parents[0].getElementsByTagName('p');
		for(let element of pArray) {
			if (element.id = 'toChats') {
				element.addEventListener('click', (e) => {
					appRouter.go('/messages');
					e.stopPropagation();
				});
			}
		}
	}
}
// const page500 = new Page500({});
// render("#Page500", page500);
