import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AvatarResponse, Credential, NewUser, UpdateUser, User, UserDto} from '@knigolub/shared';
import { APIRoute, BASE_URL } from '../constants/const';
import {updateUserDto} from '../models/update-user.dto';

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

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.PROFILE}`);
  }

  public updateAvatar(formData: FormData): Observable<AvatarResponse> {
    return this.http.post<AvatarResponse>(`${BASE_URL}/${APIRoute.USER_UPDATE_AVATAR}`, formData);
  }

  public updateUser(updateUser: updateUserDto): Observable<User> {
    return this.http.patch<User>(`${BASE_URL}/${APIRoute.PROFILE_UPDATE}`, updateUser);
  }
}
