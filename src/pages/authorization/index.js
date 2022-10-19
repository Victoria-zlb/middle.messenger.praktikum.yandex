import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import button from '../../components/button';

Handlebars.registerPartial('authorization', tpl);

const content = {
    styles: styles
}

document.getElementById('authorizationPage').innerHTML = tpl(content);