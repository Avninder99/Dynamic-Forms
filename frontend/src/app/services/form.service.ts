import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  saveForm(formFields) {
    const formData = {
      formFields
    }
    this.http.post(`${environment.backend_url}/api/form/generate`, formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('completed');
      }
    )
  }
}
