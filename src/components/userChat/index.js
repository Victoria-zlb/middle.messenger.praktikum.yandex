import Handlebars from 'handlebars';
import * as styles from './style.module.sass';
import tpl from './tpl.hbs';
import './style.module.sass';

Handlebars.registerPartial('userChat', tpl);

export default (content) => {
	return tpl(content);
}
