import tpl from "./tpl.hbs";
import "./style.sass";
import Component from "../../services/Block";
import { ButtonInterfaceProps } from "./buttonInterface";

export class Button extends Component {
	constructor(props: ButtonInterfaceProps) {
		super("div", props);
	}

	render() {
		return this.compile(tpl, this.props);
	}
}
