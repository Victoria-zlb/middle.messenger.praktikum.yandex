import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import { Button } from "../../components/button";
import { render } from "../../services/RenderDom";
import Block from "../../services/Block";
import { Input } from "../../components/input";
import { SerializeForm } from "../../services/SerializaForm";
import { validateForm } from "../../consts/utils";

const inputsClass = "registrationInput";

const inputs = [
	{
		label: "Почта",
		type: "email",
		login: "email",
		className: inputsClass
	},
	{
		label: "Логин",
		type: "login",
		login: "login",
		className: inputsClass
	},
	{
		label: "Имя",
		type: "text",
		login: "first_name",
		className: inputsClass
	},
	{
		label: "Фамилия",
		type: "text",
		login: "second_name",
		className: inputsClass
	},
	{
		label: "Телефон",
		type: "tel",
		login: "phone",
		className: inputsClass
	},
	{
		label: "Пароль",
		type: "password",
		login: "password",
		className: inputsClass
	},
	{
		label: "Пароль ещё раз",
		type: "password",
		login: "password",
		className: inputsClass
	}
].map((input) => new Input(input));

const button = new Button({
	value: "Зарегистрироваться",
	id: "registrationBtn",
	events: {
		click: () => {
			console.log("Валидация формы при клике на кнопку: " + validateForm(inputsClass));
			console.log(SerializeForm("#registration"));
		}
	}
});

class registrationPage extends Block {
	constructor(props: object) {
		super("main", {
			...props, styles, inputs, button
		});
	}

	render() {
		return this.compile(tpl, this.props);
	}
}
const page = new registrationPage({});

render("#registrationPage", page);
