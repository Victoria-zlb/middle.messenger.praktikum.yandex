import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import * as chatStyles from "../../components/userChat/style.module.sass";
import iconAdd from "../../../static/icon/icon_add.png";
import iconMore from "../../../static/icon/icon_more.png";
import iconSend from "../../../static/icon/icon_send.png";
import iconAttachment from "../../../static/icon/icon_attachment.png";
import iconEdit from "../../../static/icon/icon_edit.png";
import iconAvatar from "../../../static/icon/icon_person.png";
import Block from "../../services/Block";
import { render } from "../../services/RenderDom";
import UserChat from "../../components/userChat";

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

console.log(userChats);

class chatsPage extends Block {
	constructor(props) {
		const data = {
			styles,
			chatStyles,
			iconAdd,
			iconMore,
			iconSend,
			iconAttachment,
			iconEdit,
			iconAvatar,
			userChats
		};
		super("main", { ...props, ...data });
	}

	render() {
		return this.compile(tpl, this.props);
	}
}
const chats = new chatsPage(null);
render("#chatsPage", chats);
