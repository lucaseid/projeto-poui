import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasulService {
  private readonly apiUrl = 'http://192.168.1.240:8180/api/csp/v1/api-poui'; // Altere para o seu endpoint

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const username = 'six';
    const password = 'onougupa';
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

    console.log('Chamando API com headers:', headers);
    return this.http.get(this.apiUrl, { headers });
  }
}
