import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatasulService {
  private apiUrl = 'http://servidor:porta/api/cidades'; // Altere para o seu endpoint

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }   
 
}
