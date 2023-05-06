import tpl from "./tpl.hbs";
import * as styles from "./style.module.sass";
import Component from "../../services/Block";
import { EditInfoInterface } from "./editInfoInterface";
import { Button } from "../button";
import { Input } from "../input";
import { v4 as uuidv4 } from 'uuid';
import { getClassName } from "../../utils/getClassName";
import { getEnding } from "../../utils/getEnding";
import { validate } from "../../consts/utils";
import { ProfileAPI, UpdateProfileRequest } from "../../api/ProfileAPI";
import iconEdit from "../../../static/icon/icon_edit.png";

const profileAPI = new ProfileAPI;

export class EditInfo extends Component {
	constructor(props: EditInfoInterface) {
        const editName = `Нов${getEnding(props.name.split(' ')[0])} ${props.name}`;
        const unicId = 'editInput_' + uuidv4();

        const editInput = new Input({
            type: "text",
            login: "text",
            className: getClassName(styles, 'input')
        })
        
        const successButton = new Button({
            id: "logoutBtn",
            value: "Сохранить",
            events: {
                click: async () => {
                    const userInfo = document.getElementById('userInfo');
                    const data: {
                        [key: string]: string;
                    } = {};

                    if (!userInfo) {
                        return false;
                    }

                    for (const el of userInfo.children) {
                        if (el.classList.contains('disabled')) {
                            const name = (el.children[0] as HTMLElement).dataset.name ?? '';
                            const value = (el.children[0] as HTMLElement).dataset.content ?? '';
                            data[name] = value;
                        } else {
                            const name = (el.children[0] as HTMLElement).dataset.name ?? '';
                            const valueBlock = el.children[0].getElementsByTagName('input');
                            const value = valueBlock[0].value;
                            const isValidate = validate(name, value);

                            if (!isValidate) {
                                console.error('Не прошло валидацию');
                                return false;
                            }
                            data[name] = value;
                        }
                    }
                    await profileAPI.update(data as UpdateProfileRequest);
                    this.changeEditToView()
                }
            },
            className: getClassName(styles, 'button'),
        })

        const data = {
            editInput,
            successButton,
            unicId,
            styles,
            editName,
            iconEdit,
            isViewEdit: false,
            isViewContent: true,
        }
		super("div", { ...props, ...data });
	}

    disabled(isDisabled: boolean) {
        const editInfo = document.getElementById('userInfo');
            
        if (editInfo) {
            for(const element of editInfo.children) {
                if (element.children[0].id !== this.props.unicId) {
                    if (isDisabled) {
                        (element as HTMLElement).classList.add('disabled');
                    } else {
                        (element as HTMLElement).classList.remove('disabled');
                    }
                }
            }
        }
    }

    render(){
		return this.compile(tpl, this.props);
	}

    changeViewToEdit() {
        this.props.isViewEdit = true;
        this.props.isViewContent = false;

        this.disabled(true);
        this.reRender();
    }

    changeEditToView() {
        this.props.isViewEdit = false;
        this.props.isViewContent = true;

        this.disabled(false);
        this.reRender();
    }

    postRender() {
        const parents = this._element.children;
		const editButton = parents[0].getElementsByClassName(getClassName(styles, 'edit'));
        editButton[0]?.addEventListener('click', () => this.changeViewToEdit());
    }
    
}
