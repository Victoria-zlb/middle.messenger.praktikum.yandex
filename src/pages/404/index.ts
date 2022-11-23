import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import Block from "../../services/Block";
import { render } from "../../services/RenderDom";

class Page404 extends Block {
	constructor(props) {
		const data = {
			errorMessage: "Не туда попали",
			styles
		};
		super("main", { ...props, ...data });
	}

	render() {
		return this.compile(tpl, this.props);
	}
}
const page404 = new Page404(null);
render("#Page404", page404);
