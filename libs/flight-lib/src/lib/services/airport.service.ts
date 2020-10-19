import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<string[]> {
    const url = 'http://www.angular.at/api/airport';
    return this.httpClient.get<string[]>(url);
  }
}
