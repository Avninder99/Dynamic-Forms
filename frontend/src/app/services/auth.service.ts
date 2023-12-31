import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  router = inject(Router);
  http = inject(HttpClient);
  tokenService = inject(TokenService);

  sendLoginRequest(data: { email: string, password: string }) {
    const { email, password } = data; // just to pass required data to backend only
    return this.http.post(`${environment.backend_url}/api/auth/login`, { email, password });
  }

  sendRegisterRequest(data: { fullname: string, email: string, password: string, gender: string }) {
    const { fullname, email, password, gender } = data;
    return this.http.post(`${environment.backend_url}/api/auth/register`, { fullname, email, password, gender });
  }

  activateAccount(slug: string) {
    return this.http.get(`${environment.backend_url}/api/auth/accountActivation/${slug}`);
  }

}
