import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import { Button } from "../../components/button";
import { render } from "../../services/RenderDom";
import Block from "../../services/Block";
import { SerializeForm } from "../../services/SerializaForm";
import { Input } from "../../components/input";
import { validateForm } from "../../consts/utils";

interface abstract {}

const inputsClass = "authorizationInput";

const inputs = [
	{
		label: "Логин",
		type: "login",
		login: "login",
		className: inputsClass
	},
	{
		label: "Пароль",
		type: "password",
		login: "password",
		className: inputsClass
	}
].map((input) => new Input(input));

const button = new Button({
	value: "Войти",
	id: "random",
	events: {
		click: () => {
			console.log("Валидация формы при клике на кнопку: " + validateForm(inputsClass));
			console.log(SerializeForm("#authorization"));
		},
	}
});

class authorizationPage extends Block {
	constructor(props: abstract) {
		super("main", {
			...props, styles, inputs, button
		});
	}

	render() {
		return this.compile(tpl, this.props);
	}
}
const page = new authorizationPage({});

render("#authorizationPage", page);
