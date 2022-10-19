import Handlebars from 'handlebars';
//import Handlebars from 'handlebars/dist/handlebars.runtime';
import tpl from './tpl.hbs';
import './style.sass';

Handlebars.registerPartial('button', tpl);

export default (id, value) => {
	return tpl({ id, value });
}
