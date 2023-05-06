import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import * as chatStyles from "../../components/userChat/style.module.sass";
import { UserChat } from "../../components/userChat";
import iconAdd from "../../../static/icon/icon_add.png";
import iconMore from "../../../static/icon/icon_more.png";
import iconAvatar from "../../../static/icon/icon_person.png";
import Page from "../Page";
import { appRouter } from "../../../static";
import { getClassName } from "../../utils/getClassName";
import { Input } from "../../components/input";
// import { render } from "../../services/RenderDom";

interface abstract {}

const userChatsInfo = [
	{
		iconAvatar: iconAvatar,
		userName: "Асафьев Стас",
		description: "Привет Котик!..",
		time: "10:41"
	},
	{
		iconAvatar: iconAvatar,
		userName: "Лебедев Арсений",
		description: "Фига ты нарисовал!..",
		time: "10:20"
	},
	{
		iconAvatar: iconAvatar,
		userName: "Новости Верхний..",
		description: "Очередь на пропуск..",
		time: "09:00"
	}
];

const userChats = userChatsInfo.map((user) => new UserChat(user));

export class chatsPage extends Page {
	constructor(props: abstract) {
		const data = {
			styles,
			chatStyles,
			iconAdd,
			iconMore,
			iconAvatar,
			userChats
		};
		super("main", { ...props, ...data });
	}

	render() {
		return this.compile(tpl, this.props);
	}

	postRender() {
		const parents = this._element.children;
		const pArray = parents[0].getElementsByTagName('div');
		for(let element of pArray) {
			if (element.id === 'toSettings') {
				element.addEventListener('click', (e) => {
					appRouter.go('/settings');
					e.stopPropagation();
				});
			}
			const inputsClass = getClassName(styles, 'addChatInput');
			if (element.id === 'addChats') {
				element.children[0].addEventListener('click', (e) => {
					console.log('click')
					const input = new Input({
						label: "Название чата",
						type: "text",
						login: "text",
						className: inputsClass
					}).render();
					element.appendChild(input);
				})
			}
		}
	}
}
// const chats = new chatsPage({});
// render("#chatsListPage", chats);
