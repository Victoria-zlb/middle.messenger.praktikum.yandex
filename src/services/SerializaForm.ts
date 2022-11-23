import { serializeForm } from "../consts/utils";

export const SerializeForm = (query: string) => {
	const HTMLElement = document.querySelector(`${query}`);
	return serializeForm(HTMLElement);
};
