import Handlebars from "handlebars";
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import * as chatStyles from '../../components/userChat/style.module.sass';
import userChat from '../../components/userChat';
import iconAdd from '../../../static/icon/icon_add.png';
import iconMore from '../../../static/icon/icon_more.png';
import iconSend from '../../../static/icon/icon_send.png';
import iconAttachment from '../../../static/icon/icon_attachment.png';
import iconEdit from '../../../static/icon/icon_edit.png';
import iconAvatar from '../../../static/icon/icon_person.png';

Handlebars.registerPartial('chatsPage', tpl);

const content = {
    styles,
    chatStyles,
    iconAdd,
    iconMore,
    iconSend,
    iconAttachment,
    iconEdit,
    iconAvatar
}

document.getElementById('chatsPage').innerHTML = tpl(content);