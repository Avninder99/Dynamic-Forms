import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: String = '';

  constructor() { }

  cookieService = inject(CookieService);
  route = inject(Router);

  // fetches the token from cookies and redirects to login page if cookie not avaliable
  fetchTokenFromCookie() {
    if (this.cookieService.check('token')) {
      const userToken = this.cookieService.get('token');
      this.token = userToken;
    } else {
      // redundant but just to be on safe side
      this.token = '';
      this.route.navigate(['/login']);
    }
  }

  // returns the token if present else returns an empty string;
  getToken() {
    if (!this.token) {
      if(this.cookieService.check('token')){
        const userToken = this.cookieService.get('token');
        this.token = userToken;
      }
    }
    return this.token;
  }

  // returns the payload from token if avaliable else return null
  getParsedTokenData() {
    try {
      if (!this.token) {
        this.fetchTokenFromCookie()
      }
      let payload = this.token.split('.')[1];
      payload = payload.replace(/-/g, '+').replace(/_/g, '/');
      payload = decodeURIComponent(window.atob(payload).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      let res = JSON.parse(payload);
      return res;
    } catch (error) {
      return null;
    }
  }

  // takes the payload and if not avaliable then redirects to login page 
  // else if availiable checks for the expiration time and based on it deletes it
  tokenChecker() {
    try {
      const payload = this.getParsedTokenData();
      if(!payload) {
        this.route.navigate([ '/login' ]);
      } else if(payload.exp <= (Date.now()/1000)){
        this.cookieService.delete('token');
        this.route.navigate([ '/login' ]);
      }
    } catch {
      this.cookieService.delete('token');
      this.route.navigate([ '/login' ]);
    }
  }

  // save token to cookie with expiration time
  saveToken(token: string) {
    this.clearToken();
    this.token = token;
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 3600000);
    this.cookieService.set('token', token, expirationTime, '/');
  }

  // delete token from the cookies
  clearToken() {
    this.cookieService.delete('token', '/');
    this.token = '';
  }
}
