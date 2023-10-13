import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  route = inject(Router);
  tokenService = inject(TokenService);

  constructor(private http: HttpClient) { }

  saveForm(formName: String, formFields) {

    const userToken = this.tokenService.getToken();

    const formData = {
      token: userToken,
      formName,
      formFields
    }

    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }
    return this.http.post(`${environment.backend_url}/api/form/generate`, formData, header);
  }

  fetchForm(id: String) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }
    return this.http.get(`${environment.backend_url}/api/form/${id}`, header);
  }

  updateForm(formName: String, formFields, formId: String) {
    const userToken = this.tokenService.getToken();
    const header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${userToken}`)
    }

    const body = {
      formName,
      formFields,
      formId
    }
    return this.http.post(`${environment.backend_url}/api/form/${formId}/update`, body, header);
  }
}
