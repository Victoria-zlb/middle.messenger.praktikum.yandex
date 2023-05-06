export const render = (query: string, block: any) => {
	console.log(block);
	const root: HTMLElement | null = document.querySelector(query);
	if (!root) {
		throw new Error(`Не найден селектор: ${query}`);
	}
	root.appendChild(block.getContent());

	block.dispatchComponentDidMount();
};
