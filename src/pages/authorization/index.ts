import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import { Button } from "../../components/button";
// import { render } from "../../services/RenderDom";
import { appRouter } from '../../../static/index';
import Page from "../Page";
import { SerializeForm } from "../../services/SerializaForm";
import { Input } from "../../components/input";
import { validateForm } from "../../consts/utils";
import { LoginAPI, LoginRequest } from "../../api/LoginAPI";

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

const loginApi = new LoginAPI;

const login = async(data: LoginRequest) => {
	const result = await loginApi.request(data);
	if (result.status === 200) {
		appRouter.go('/messages');
	} else {
		if (result.response?.reason === 'User already in system') {
			appRouter.go('/messages');
		}
		else {
			console.error('Что-то пошло не так');
			if (result.response?.reason) {
				console.log(result.response?.reason);
			}
		}
	}
}

const button = new Button({
	value: "Войти",
	id: "random",
	events: {
		click: () => {
			console.log("Валидация формы при клике на кнопку: " + validateForm(inputsClass));
			console.log(SerializeForm("#authorization"));
			
			const isValidate = validateForm(inputsClass);

			if (!isValidate) {
				console.error('Форма не прошла валидацию');
				return false;
			}

			const form = SerializeForm("#authorization");

			if (form instanceof Error) {
				return false;
			}

			const data = {
				login: form.find(el => el.name === 'login')?.value ?? '',
				password: form.find(el => el.name === 'password')?.value ?? '',
			};

			login(data);
		},
	}
});

export class authorizationPage extends Page {
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
			if (element.id === 'toRegistration') {
				element.addEventListener('click', (e) => {
					appRouter.go('/sign_up');
					e.stopPropagation();
				});
			}
		}
	}
}
// const page = new authorizationPage({});

// render("#authorizationPage", page);
