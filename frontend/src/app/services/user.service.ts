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

  fetchMe() {
    return this.http.get(`${environment.backend_url}/api/user/me`);
  }

  fetchUsers(searchTerm) {
    return this.http.get(`${environment.backend_url}/api/user?search=${searchTerm}`);
  }

}
