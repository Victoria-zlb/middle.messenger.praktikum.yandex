import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import button from '../../components/button';

Handlebars.registerPartial('404', tpl);

const content = {
    styles: styles
}

document.getElementById('404Page').innerHTML = tpl(content);