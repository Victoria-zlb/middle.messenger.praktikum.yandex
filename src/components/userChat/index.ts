import * as styles from "./style.module.sass";
import tpl from "./tpl.hbs";
import "./style.module.sass";
import Block from "../../services/Block";

export default class UserChat extends Block {
	constructor(props) {
		const data = {
			styles
		};
		super("div", { ...props, ...data });
	}

	render() {
		return this.compile(tpl, this.props);
	}

	postRender() {
		return this._element.addEventListener(
			"click",
			() => console.log("click")
		);
	}
}
