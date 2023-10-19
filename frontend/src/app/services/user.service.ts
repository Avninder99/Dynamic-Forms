import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  router = inject(Router);
  http = inject(HttpClient);
  tokenService = inject(TokenService);
  
  constructor() { }

  fetchUser() {
    const token = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${token}`)
    }
    return this.http.get(`${environment.backend_url}/api/user/`, header);
  }
}
