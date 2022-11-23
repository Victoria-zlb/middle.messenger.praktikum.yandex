export const render = (query: string, block: any) => {
	const root: HTMLElement | null = document.querySelector(query);
	if (!root) {
		throw new Error(`Не найден селектор: ${query}`);
	}
	root.appendChild(block.getContent());

	block.dispatchComponentDidMount();
};
