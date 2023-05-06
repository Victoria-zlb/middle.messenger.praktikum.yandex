import { Router } from '../src/services/Router';
import { Page500 } from '../src/pages/500';
import { authorizationPage } from '../src/pages/authorization';
import { registrationPage } from '../src/pages/registration';
import { profilePage } from '../src/pages/profile';
import { chatsPage } from '../src/pages/chatsList';

export const appRouter = new Router('#app');

appRouter
  .use('/', authorizationPage)
  .use('/sign_up', registrationPage)
  .use('/settings', profilePage)
  .use('/messages', chatsPage)
  .use('/500', Page500)
  .start();

// const appModal = new Modal({});
// new ModalController(appModal);
// render('#app', appModal);
