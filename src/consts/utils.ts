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
	type: "email" | "login" | "password" | "tel" | "name" | "text" | string,
	value: string,
	name?: string
): boolean | undefined => {
	const checkEmail = (value: string) => /^[\w-]+@([\w-]+\.)+[\w-]+$/.test(value);
	const checkLogin = (value: string) => /^[A-Za-z][\w\-_]{2,19}$/.test(value);
	const checkPassword = (value: string) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/.test(value);
	const checkTel = (value: string) => /^((8|\+7)[ ]?)?(\(?\d{3}\)?[ ]?)?[\d\- ]{7,10}[^a-zA-Z]$/.test(value);
	const checkName = (value: string) => /^[А-Я][а-яА-Я]{1,30}$/u.test(value);

	if(type === "text") {
		name === "login" ? type = "login" : false;
		name === "first_name" ? type = "name" : false;
		name === "second_name" ? type = "name" : false;
	}

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
