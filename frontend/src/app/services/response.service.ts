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
    console.log(response);

    const body = {
      response,
      formId
    }

    return this.http.post(`${environment.backend_url}/api/response/generate`, body);
  }

  fetchMyResponses() {
    return this.http.get(`${environment.backend_url}/api/response/fetchAll`);
  }

  fetchResponse(responseId: string) {
    console.log(responseId);
    return this.http.get(`${environment.backend_url}/api/response/${responseId}`);
  }

  fetchFormResponses(formId: string) {
    return this.http.get(`${environment.backend_url}/api/response/${formId}/responses`);
  }
}
