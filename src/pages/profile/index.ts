import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import arrow from "../../../static/icon/arrow.png";
import iconEdit from "../../../static/icon/icon_edit.png";
import iconAvatar from "../../../static/icon/icon_person.png";
import Button from "../../components/button";
import { render } from "../../services/RenderDom";
import Block from "../../services/Block";

const button = [
	{
		id: "changeBtn",
		value: "Изменить пароль",
		events: {
			click: () => console.log("click changeBtn")
		}
	},
	{
		id: "logoutBtn",
		value: "Выйти",
		events: {
			click: () => console.log("click logoutBtn")
		}
	}
].map((info) => new Button(info));

class profilePage extends Block {
	constructor(props) {
		const data = {
			styles,
			iconEdit,
			iconAvatar,
			arrow,
			button
		};
		super("main", { ...props, ...data });
	}

	render() {
		return this.compile(tpl, this.props);
	}
}
const page = new profilePage({});

render("#profilePage", page);
