import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import Page from "../Page";
import { appRouter } from '../../../static/index';
// import { render } from "../../services/RenderDom";

interface abstract {}

export class Page404 extends Page {
	constructor(props: abstract) {
		const data = {
			errorMessage: "Не туда попали",
			href: `${window.location.origin}/messages`,
			styles
		};
		super("main", { ...props, ...data });
	}

	render() {
		this.setPageTitle('404');
		return this.compile(tpl, this.props);
	}

	postRender() {
		const parents = this._element.children;
		const pArray = parents[0].getElementsByTagName('p');
		for(let element of pArray) {
			if (element.id = 'toChats') {
				element.addEventListener('click', () => {
					appRouter.go('/messages');
				});
			}
		}
	}
}
// const page404 = new Page404({});
// render("#Page404", page404);
