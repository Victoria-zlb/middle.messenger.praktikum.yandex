import Handlebars from "handlebars";
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import * as chatStyles from '../../components/userChat/style.module.sass';
import userChat from '../../components/userChat';
import iconAdd from '../../../static/icon/icon_add.png';
import iconMore from '../../../static/icon/icon_more.png'

Handlebars.registerPartial('chatsListPage', tpl);

const content = {
    styles,
    chatStyles,
    iconAdd,
    iconMore
}

document.getElementById('chatsListPage').innerHTML = tpl(content);