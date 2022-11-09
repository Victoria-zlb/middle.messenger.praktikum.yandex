import Handlebars from "handlebars";
import tpl from './tpl.hbs';
import * as styles from './style.module.sass';
import button from '../../components/button';

Handlebars.registerPartial('registration', tpl);
// Handlebars.registerHelper("Styles", () => styles);
const content = {
    styles: styles
}

document.getElementById('registrationPage').innerHTML = tpl(content);