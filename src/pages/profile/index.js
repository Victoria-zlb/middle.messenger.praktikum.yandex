import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import button from '../../components/button';
import arrow from '../../../static/icon/arrow.png';
import iconEdit from '../../../static/icon/icon_edit.png';
import iconAvatar from '../../../static/icon/icon_person.png';

Handlebars.registerPartial('profile', tpl);

const content = {
    styles,
    arrow,
    iconEdit,
    iconAvatar
}

document.getElementById('profilePage').innerHTML = tpl(content);