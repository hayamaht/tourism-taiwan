import { environment } from "./environments/environment";

const BASE_URL = !environment.production
  ? 'http://localhost:5000'
  : '';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_FAVORITE_URL = BASE_URL + '/api/users/favorite';
export const USER_FAVORITES_URL = BASE_URL + '/api/users/favorites';
export const USER_SETTINGS_URL = BASE_URL + '/api/users/settings';
export const USER_GETSETTINGS_URL = BASE_URL + '/api/users/get_settings';
