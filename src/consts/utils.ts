import {IFormNode, IElement} from "./interfase";

export const serializeForm = (formNode: IFormNode) => {
	const { elements } = formNode;
	const data = Array.from(elements)
		.filter((item) => !!item.name)
		.map((element) => {
			const { name, value } = element;

			return { name, value };
		});

	return data;
};

export const validate = (
	type: "email" | "login" | "password" | "tel" | "name" | "text",
	value: string
): boolean => {
	const checkEmail = (value: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]+$/.test(value); // eslint-disable-line
	const checkLogin = (value: string) => /^[A-Za-z][\w\-_]{2,19}$/.test(value);
	const checkPassword = (value: string) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/.test(value); // eslint-disable-line
	const checkTel = (value: string) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/.test(value); // eslint-disable-line
	const checkName = (value: string) => /^[А-Я][а-яА-Я\-]{1,30}$/u.test(value); // eslint-disable-line

	if (!value.length) return false;
	switch (type) {
	case ("email"): return checkEmail(value);
	case ("login"): return checkLogin(value);
	case ("password"): return checkPassword(value);
	case ("tel"): return checkTel(value);
	case ("name"): return checkName(value);
	case ("text"): return true;
	}
};

export const validateForm = (className: string) => {
	const elements = document.getElementsByClassName(`${className}`);

	if (!elements) return false;

	const data = Array.from(elements)
		.filter((item: IElement) => !!item.name)
		.map((element: IElement) => {
			const { type, value } = element;
			const isValidate = validate(type, value);
			return isValidate;
		});
	const isValidateData = data.every((e) => e === true);
	return isValidateData;
};
