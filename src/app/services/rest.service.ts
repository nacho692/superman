import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  get<T>(query: string): Observable<T> {
    return this.http.get<T>(query, { headers: this.getHeaders() });
  }

  delete(query: string): Observable<Object> {
    return this.http.delete(query, { headers: this.getHeaders(), responseType: 'text'});
  }

  post<T>(query: string, payload: any): Observable<T>;
  post(query: string, payload: any): Observable<Object> {
    return this.http.post(query, payload, { headers: this.getHeaders(), responseType: 'json' });
  }

  put<T>(query: string, payload: any): Observable<T>;
  put(query: string, payload: any): Observable<Object> {
    return this.http.put(query, payload, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "caller": this.authenticationService.getCaller(),
      "token": this.authenticationService.getToken()
    });
  }
}
