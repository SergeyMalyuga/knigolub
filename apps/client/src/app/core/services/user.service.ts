import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Credential, NewUser, UserDto} from '@knigolub/shared';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public registerUser(newUser: NewUser): Observable<UserDto> {
    return this.http.post<UserDto>(`${BASE_URL}/${APIRoute.USER_REGISTER}`, newUser);
  }

  public login(credential: Credential): Observable<UserDto> {
    return this.http.post<UserDto>(`${BASE_URL}/${APIRoute.USER_LOGIN}`, credential);
  }
}
