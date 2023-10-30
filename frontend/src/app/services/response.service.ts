import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  route = inject(Router);
  tokenService = inject(TokenService);

  constructor(private http: HttpClient) { }

  saveResponse(response, formId) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }
    console.log(response);

    const body = {
      response,
      formId
    }

    return this.http.post(`${environment.backend_url}/api/response/generate`, body, header);
  }

  fetchMyResponses() {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    return this.http.get(`${environment.backend_url}/api/response/fetchAll`, header);
  }

  fetchResponse(responseId: string) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    console.log(responseId);
    return this.http.get(`${environment.backend_url}/api/response/${responseId}`, header);
  }
}
