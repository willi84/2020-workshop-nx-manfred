import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Flight } from '@flight-workspace/flight-lib';
import { debounceTime, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css']
})
export class FlightLookaheadComponent implements OnInit {

  control = new FormControl();
  flights$ : Observable<Flight[]>;
  loading :boolean;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.control = new FormControl();

    this.flights$ = 
        this.control
            .valueChanges
            .pipe(
                debounceTime(300),
                tap(input => this.loading = true),
                switchMap(input => this.load(input)),
                tap(v => this.loading = false)
            );
}
  load(from: string):Observable<Flight[]>  {
    let url = "http://www.angular.at/api/flight";

    let params = new HttpParams()
                        .set('from', from);

    let headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});

};

}
