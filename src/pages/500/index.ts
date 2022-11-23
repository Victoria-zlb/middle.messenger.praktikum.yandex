import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import Block from "../../services/Block";
import { render } from "../../services/RenderDom";

class Page500 extends Block {
	constructor(props) {
		const data = {
			errorMessage: "Мы уже фиксим",
			styles
		};
		super("main", { ...props, ...data });
	}

	render() {
		return this.compile(tpl, this.props);
	}
}
const page500 = new Page500(null);
render("#Page500", page500);
