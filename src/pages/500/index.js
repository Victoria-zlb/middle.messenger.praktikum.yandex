import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import button from '../../components/button';

Handlebars.registerPartial('500', tpl);

const content = {
    styles: styles
}

document.getElementById('500Page').innerHTML = tpl(content);