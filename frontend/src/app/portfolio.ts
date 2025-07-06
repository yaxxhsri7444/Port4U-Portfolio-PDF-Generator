import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Portfolio {
  constructor(private http: HttpClient) {}

  downloadPDF(data: any) {
    return this.http.post(
      'https://port4u-backend.onrender.com/generate-pdf',
      data,
      {
        responseType: 'blob',
      }
    );
  }
}
