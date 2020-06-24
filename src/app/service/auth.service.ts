import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
authUrl = environment.authUrl;
  constructor(private http: HttpClient) { }

  // login(credentials): Observable<any> {
  //   return this.http.post(AUTH_API + 'signin', {
  //     username: credentials.username,
  //     password: credentials.password
  //   }, httpOptions);

  // register(user): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   }, httpOptions);
  // }
  registerUser(signUpObj): any{
    return this.http.post(this.authUrl + '/signup', signUpObj, {responseType: 'text'});
  }
  loginUser(signInObj): any{
    return this.http.post(this.authUrl + '/signin', signInObj, {responseType: 'text'});
  }
}
