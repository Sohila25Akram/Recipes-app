import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  request<T>(method: 'GET' | 'POST' | 'DELETE' | 'PUT', endpoint: string, options?: { [key: string]: any }): Observable<T>{
    return this.http.request<T>(method, endpoint, options);
  }
}
