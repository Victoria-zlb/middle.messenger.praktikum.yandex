import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import button from '../../components/button';
import arrow from '../../../static/icon/arrow.png';
import iconEdit from '../../../static/icon/icon_edit.png';

Handlebars.registerPartial('profile', tpl);

const content = {
    styles,
    arrow,
    iconEdit
}

document.getElementById('profilePage').innerHTML = tpl(content);