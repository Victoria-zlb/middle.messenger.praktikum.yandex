import { ProfileAPI } from "../api/ProfileAPI";
const profileAPI = new ProfileAPI;

let modalFileUpload: { name: string; image: string | ArrayBuffer; file: Blob } = {
    name: '',
    image: '',
    file: '',
};

export const modalUpdate = (isOpen: boolean) => {
    if (isOpen) {
        const modal = `
            <div class="modal">
                <div class="modal_container">
                    <p class="modal_text">Загрузка фотографии</p>
                    <div class="modal_input_emulate" id="dropdownWindow">
                        <div class="modal_input_text">
                            <span class="modal_input_click" id="modalClick">Нажмите</span>
                            &nbsp
                            <span class="modal_input_black">или перетащите</span>
                        </div>
                    </div>
                    <form id="formElem">
                      <input type="file" title=" " class="modal_input" id="uploadInput"></input>
                    </form>
                    <div class="modal_send_button modal_disabled" id="sendButton">Отправить</div>
                    <div id="modal_close">&#10006;</div>
                </div>
                <div class="modal_overlay"></div>
            </div>
        `

        const app = document.getElementById('app');
        app?.insertAdjacentHTML('beforeend', modal);

        const dropArea = document.getElementById('dropdownWindow');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea?.addEventListener(eventName, preventDefaults, false);
        });
        function preventDefaults(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        }
        ['dragenter', 'dragover'].forEach(eventName => {
        dropArea?.addEventListener(eventName, highlight, false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
        dropArea?.addEventListener(eventName, unhighlight, false);
        });
        function highlight() {
        if (dropArea) {
            dropArea.style.borderColor = 'green';
        }
        }
        function unhighlight() {
        if (dropArea) {
            dropArea.style.borderColor = '#707070';
        }
        }

        dropArea?.addEventListener('drop', handleDrop, false);

        document.getElementById('sendButton')?.addEventListener('click', sendFiles);
        document.getElementById('modalClick')?.addEventListener('click', uploadFileClick);
        document.getElementById('uploadInput')?.addEventListener('change', previewFiles);
        document.getElementById('modal_close')?.addEventListener('click', () => modalUpdate(false));
        document.getElementsByClassName('modal_overlay')[0]?.addEventListener('click', () => modalUpdate(false));
    } else {
        document.getElementsByClassName('modal')[0].remove();
    }
}

const options = {
    multi: false,
}

const handleDrop = (e: DragEvent) => {
    const dt = e.dataTransfer;

    if (!dt) {
      return false;
    }

    const files = dt.files;

    saveFiles(files);
}

const saveFiles = (files: FileList) => {
  
    if (!options?.multi) {
      if (files.length > 1) {
        console.error('Можно загрузить только один файл');

        return false;
      } else {
        // this.error = '';
      }

      // this.openDrop = false;
    }

    const filesArray = Array.from(files);

    filesArray.forEach(file => {
      console.log(file.type);
      modalFileUpload.file = file;

      if (!file.type.match('image') && !file.type.match('pdf')) {
        return null;
      }

      const reader = new FileReader();

      reader.onload = ev => {
        if (!ev.target) {
          return false;
        }

        if (!ev.target.result) {
          return false;
        }

        const fileToUpload = {
          name: file.name,
          image: ev.target.result,
        };

        console.log('%cФайл для загрузки', 'color: green;');
        console.log(fileToUpload);

        modalFileUpload = {...modalFileUpload, ...fileToUpload};
        const fileBlock = document.createElement('div');
        fileBlock.style.maxHeight = '160px';
        fileBlock.style.overflow = 'hidden';
        const image = document.createElement('img');
        image.style.width = '100%';
        image.src = ev.target.result as string;
        fileBlock.appendChild(image);
        document.getElementById('dropdownWindow')?.replaceWith(fileBlock);
    };

      reader.readAsDataURL(file);
    });
    document.getElementById('sendButton')?.classList.remove('modal_disabled');
    
}

const uploadFileClick = () => {
    const input = document.getElementById('uploadInput');

    if (!input) {
      return null;
    }

    const triggerInput = () => {
      input.click();
    };

    triggerInput();
}

const sendFiles = async () => {
    const file = modalFileUpload;
    if (!file) {
        return false;
    }
    const body = {
      fileContent: typeof file.image === 'string' ? file.image.split(',')[1] : file.image,
      fileName: file.name,
    };

    console.log('%cТУТ', 'color: green;')
    let formData = new FormData(document.getElementById('formElem') as HTMLFormElement);
    // console.log(formData)
    formData.append('avatar', modalFileUpload.file, 'image.png');
    for (var key of formData.entries()) {
      console.log(key);
    }
    await profileAPI.setAvatar(formData);

    modalUpdate(false);
}

const previewFiles = (e: Event) => {
    console.log(e)
    const target = e.target as HTMLInputElement;
    const files = target?.files;

    if (files) {
      saveFiles(files);
    }
}