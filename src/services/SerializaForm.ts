import { serializeForm } from "../consts/utils";

export const SerializeForm = (query: string) => {
	const HTMLElement = document.querySelector(`${query}`);
	if (!HTMLElement) {
		return new Error("Nor found selector " + query);
	}
	return serializeForm(HTMLElement);
};
