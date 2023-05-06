import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from '../services/BaseAPI';
import { BASE_URL } from '../consts/api/BASE_URL';

const usersAPITransport = new HTTPTransport(`${BASE_URL}/user`);

export class UsersAPI extends BaseAPI {
  search(searchString: string): Promise<XMLHttpRequest> {
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    };
    return usersAPITransport.post('/search', { headers, data: { login: searchString } });
  }
}
