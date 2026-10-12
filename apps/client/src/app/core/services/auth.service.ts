import {Injectable} from '@angular/core';
import {AUTH_TOKEN_KEY_NAME} from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken(): string | null {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY_NAME)
    } catch (error) {
      console.error('Ошибка получения токена из localstorage', error);
      return null;
    }
  }

  public setToken(token: string): boolean {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
      return true;
    } catch (error) {
      console.error('Ошибка добавления токена из localstorage', error)
      return false;
    }
  }

  public removeToken(): boolean {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
      return true;
    } catch (error) {
      console.log('Ошибка удаления токена из localstorage', error);
      return false;
    }
  }
}
