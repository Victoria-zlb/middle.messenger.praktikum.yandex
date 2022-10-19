import Handlebars from 'handlebars';
import * as styles from './style.module.sass';
import tpl from './tpl.hbs';
import './style.module.sass';

Handlebars.registerPartial('userChat', tpl);

export default (id, avatar, userName, description, time, styles) => {
	return tpl({id, avatar, userName, description, time, styles});
}
