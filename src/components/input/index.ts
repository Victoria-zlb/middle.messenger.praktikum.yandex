import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import Component from "../../services/Block";
import { validate } from "../../consts/utils";
import InputInterfaceProps from "./inputInterface";

export default class Input extends Component {
	constructor(props: InputInterfaceProps) {
		super("label", { ...props });
	}

	render() {
		return this.compile(tpl, { ...this.props, styles });
	}

	postRender() {
		const parents = this._element.children;
		// @ts-ignore
		for (const item of parents) {
			item.tagName === "INPUT"
				? item.addEventListener(
					"change",
					() => {
						// @ts-ignore
						if (!validate(item.type, item.value)) {
							// @ts-ignore
							item.focus();
							// @ts-ignore
							item.style.borderBottom = "1px solid red";
						} else {
							// @ts-ignore
							item.blur();
							// @ts-ignore
							item.style.borderBottom = "";
						}
					}
				)
				: false;
		}
	}
}
