import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import { Button } from "../../components/button";
// import { render } from "../../services/RenderDom";
import Page from "../Page";
import { Input } from "../../components/input";
import { SerializeForm } from "../../services/SerializaForm";
import { validateForm } from "../../consts/utils";
import { appRouter } from "../../../static";
import { SignUpAPI, SignUpRequest } from "../../api/SingUpAPI";

interface abstract {}

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

const signUpAPI = new SignUpAPI;

const registration = async(user: SignUpRequest) => {
	const result = await signUpAPI.request(user);
	console.log(result);
	if (result.status === 200) {
		console.log(result.response.id);
		appRouter.go('/messages');
	} else {
		console.error('Что-то пошло не так');
		if (result.response?.reason) {
			console.log(result.response?.reason);
		}
	}
}

const button = new Button({
	value: "Зарегистрироваться",
	id: "registrationBtn",
	events: {
		click: () => {
			console.log("Валидация формы при клике на кнопку: " + validateForm(inputsClass));
			console.log(SerializeForm("#registration"));
			const isValidate = validateForm(inputsClass);

			if (!isValidate) {
				console.error('Форма не прошла валидацию');
				return false;
			}

			const form = SerializeForm("#registration");

			if (form instanceof Error) {
				return false;
			}

			const user = {
				first_name: form.find(el => el.name === 'first_name')?.value ?? '',
				second_name: form.find(el => el.name === 'second_name')?.value ?? '',
				login: form.find(el => el.name === 'login')?.value ?? '',
				email: form.find(el => el.name === 'email')?.value ?? '',
				password: form.find(el => el.name === 'password')?.value ?? '',
				phone: form.find(el => el.name === 'phone')?.value ?? '',
			};

			registration(user);
		}
	}
});

export class registrationPage extends Page {
	constructor(props: abstract) {
		super("main", {
			...props, styles, inputs, button
		});
	}

	render() {
		return this.compile(tpl, this.props);
	}

	postRender() {
		const parents = this._element.children;
		const pArray = parents[0].getElementsByTagName('div');
		for(let element of pArray) {
			if (element.id === 'toEnter') {
				element.addEventListener('click', (e) => {
					appRouter.go('/');
					e.stopPropagation();
				});
			}
		}
	}
}
