import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUr1 = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public loginUser(user: User) {
    return this.http.post<String>(`${this.apiServerUr1}/login`, user);
  }

  public registerUser(user: User) {
    console.log('USER: ', user);
    return this.http.post<String>(
      `${this.apiServerUr1}/users/registration`,
      user
    );
  }
}
