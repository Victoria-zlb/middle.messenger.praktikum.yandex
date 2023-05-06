import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../services/BaseAPI';
import { BASE_URL } from '../consts/api/BASE_URL';

const authAPITransport = new HTTPTransport(`${BASE_URL}/auth`);

export type LoginRequest = {
  login: string;
  password: string;
};

const headers = {
  'Content-Type': 'application/json',
};
export class LoginAPI extends BaseAPI {
  request(user: LoginRequest): Promise<XMLHttpRequest> {
    return authAPITransport.post('/signin', { headers, data: user });
  }
  logout() {
    return authAPITransport.post('/logout');
  }
  getUserInfo() {
    return authAPITransport.get('/user');
  }
}
