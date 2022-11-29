import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import Component from "../../services/Block";
import { validate } from "../../consts/utils";
import { InputInterfaceProps } from "./inputInterface";

export class Input extends Component {
	constructor(props: InputInterfaceProps) {
		super("label", { ...props });
	}

	render() {
		return this.compile(tpl, { ...this.props, styles });
	}

	postRender() {
		const parents = this._element.children;
		for (const item of parents) {
			if (item instanceof HTMLInputElement) {
				item.tagName === "INPUT"
					? item.addEventListener(
						"change",
						() => {
							if (!validate(item.type, item.value, item.name)) {
								item.focus();
								item.style.borderBottom = "1px solid red";
							} else {
								item.blur();
								item.style.borderBottom = "";
							}
						}
					)
					: false;
			}
			
		}
	}
}
