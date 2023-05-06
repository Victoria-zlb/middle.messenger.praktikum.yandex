import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import arrow from "../../../static/icon/arrow.png";
import iconEdit from "../../../static/icon/icon_edit.png";
import iconAvatar from "../../../static/icon/icon_person.png";
import { Button } from "../../components/button";
import Page from "../Page";
import { LoginAPI } from "../../api/LoginAPI";
import { appRouter } from "../../../static";
import { Input } from "../../components/input";
import { ProfileAPI } from "../../api/ProfileAPI";
import { SerializeForm } from "../../services/SerializaForm";
import { validateForm } from "../../consts/utils";
import { EditInfo } from "../../components/editInfo";
import { SignUpAPI } from "../../api/SingUpAPI";
import { modalUpdate } from "../../utils/modalUpdate";

interface abstract {}

const loginAPI = new LoginAPI;

const inputsClass = "changePasswordInput";

const profileAPI = new ProfileAPI;

const inputs = [
	{
		label: "Старый пароль",
		type: "password",
		login: "password",
		className: inputsClass
	},
	{
		label: "Новый пароль",
		type: "password",
		login: "password",
		className: inputsClass
	},
	{
		label: "Повторите новый пароль",
		type: "password",
		login: "password",
		className: inputsClass
	},
].map((input) => new Input(input));

const changeButtonText = () => {
	const firstText = 'Изменить пароль';
	const secondText = 'В профиль';
	const query = 'changeBtn';

	const button = document.getElementById(query);

	if (!button) {
		return false;
	}

	if (button.textContent?.match(firstText)) {
		button.textContent = button.textContent.replace(firstText, secondText);
	} else if (button.textContent?.match(secondText)) {
		button.textContent = button.textContent.replace(secondText, firstText);
	}
}

const changePasswordButton = new Button(
	{
		id: "changePassword",
		value: "Сохранить",
		events: {
			click: async () => {
				const isValidate = validateForm(inputsClass);

				if (!isValidate) {
					console.error('не прошла валидация');
					return false;
				}

				const form = SerializeForm('#changePasswordForm');
				if (form instanceof Error) {
					return false;
				}
				const data = {
					oldPassword: form[0].value,
					newPassword: form[1].value,
				};
				const res = await profileAPI.changePassword(data);
				console.log('%c' + res + 'color: green;')
				const inputs = document.getElementById('changePassword');
				if (inputs) {
					changeButtonText();
					inputs.style.display = inputs.style.display === 'none' ? 'block' : 'none';
					const userInfo = document.getElementById('userInfo');
					if (userInfo) {
						userInfo.style.display = inputs.style.display === 'none' ? 'block' : 'none';
					}
				}
			}
		}
	}
)

// @ts-ignore: Unreachable code error
const buttonSuccess: string = styles['successButton'];

const button = [
	{
		id: "changeBtn",
		value: "Изменить пароль",
		events: {
			click: () => {
				console.log("click changeBtn");
				const inputs = document.getElementById('changePassword');
				if (inputs) {
					changeButtonText();
					inputs.style.display = inputs.style.display === 'none' ? 'block' : 'none';
					const userInfo = document.getElementById('userInfo');
					if (userInfo) {
						userInfo.style.display = inputs.style.display === 'none' ? 'block' : 'none';
					}
				}
			}
		}
	},
	{
		id: "logoutBtn",
		value: "Выйти",
		events: {
			click: () => {
				console.log("click logoutBtn");
				loginAPI.logout();
				appRouter.go('/');
			}
		}
	},
].map((info) => new Button(info));

const signUp = new SignUpAPI;

const editsInfo = [
	{
		name: 'Почта',
		valueName: 'email',
		content: '',
	},
	{
		name: 'Логин',
		valueName: 'login',
		content: '',
	},
	{
		name: 'Имя',
		valueName: 'first_name',
		content: '',
	},
	{
		name: 'Фамилия',
		valueName: 'second_name',
		content: '',
	},
	{
		name: 'Имя в чате',
		valueName: 'display_name',
		content: '',
	},
	{
		name: 'Телефон',
		valueName: 'phone',
		content: '',
	},
].map(editInfo => new EditInfo(editInfo));


export class profilePage extends Page {
	constructor(props: abstract) {
		
		const data = {
			styles,
			iconEdit,
			iconAvatar,
			editsInfo: editsInfo,
			arrow,
			inputs,
			changePasswordButton,
			button,
		};
		super("main", { ...props, ...data });

		this.setEdits();
	}

	async setEdits() {
		const newInfo = await signUp.userInfo();
		const result = newInfo.response;
 
		const editsInfo = [
			{
				name: 'Почта',
				valueName: 'email',
				content: result['email'],
			},
			{
				name: 'Логин',
				valueName: 'login',
				content: result['login'],
			},
			{
				name: 'Имя',
				valueName: 'first_name',
				content: result['first_name'],
			},
			{
				name: 'Фамилия',
				valueName: 'second_name',
				content: result['second_name'],
			},
			{
				name: 'Имя в чате',
				valueName: 'display_name',
				content: result['display_name'],
			},
			{
				name: 'Телефон',
				valueName: 'phone',
				content: result['phone'],
			},
		].map(editInfo => new EditInfo(editInfo));
		this.children.editsInfo = editsInfo;
		this.props.iconAvatar = result['avatar'] ?? iconAvatar;
		this.reRender()
	}

	render() {
		return this.compile(tpl, this.props);
	}

	postRender() {
		const parents = this._element.children;
		const pArray = parents[0].getElementsByTagName('div');
		for(let element of pArray) {
			if (element.id === 'toChats') {
				element.addEventListener('click', (e) => {
					appRouter.go('/messages');
					e.stopPropagation();
				});
			}
			if (element.id === 'addAvatar') {
				element.addEventListener('click', (e) => {
					modalUpdate(true);
					e.stopPropagation();
				});
			}
		}
	}
}
