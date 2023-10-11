import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  route = inject(Router);
  http = inject(HttpClient);

  sendLoginRequest(data: { email: String, password: String }) {
    const { email, password } = data;
    return this.http.post(`${environment.backend_url}/api/auth/login`, { email, password });
  }

}
