import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInStatus = false;
  header = {headers: new HttpHeaders().set('token', localStorage.getItem('emailToken'))}

  authUrl = environment.authUrl;
  constructor(private http: HttpClient) { }

  registerUser(signUpObj): any{
    return this.http.post(this.authUrl + '/signup', signUpObj, {responseType: 'text'});
  }
  loginUser(signInObj): any{
    return this.http.post(this.authUrl + '/signin', signInObj);
  }
  forgotPassword(email): any {
    return this.http.get(this.authUrl + '/forgot-password/' + email, {responseType: 'text'});
  }
  resetPassword(resetPasswordObj): any {
    return this.http.post(this.authUrl + '/reset-password', resetPasswordObj, this.header);
  }
  isLogin(): boolean{
    let key = localStorage.getItem('token');
    console.log('generated key ', key);
    if (key === null) {
    return false;
  }
  else{
    return true;
  }
}
}
