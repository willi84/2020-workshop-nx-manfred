import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Flight } from '@flight-workspace/flight-lib';
import { debounceTime, tap, map, startWith, distinctUntilChanged, combineLatest, filter, switchMap, takeUntil } from 'rxjs/operators';
import { interval, Subject } from 'rxjs';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'flight-workspace-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css']
})
export class FlightLookaheadComponent implements OnInit {

  control = new FormControl();
  flights$ : Observable<Flight[]>;
  loading: boolean;
  online: boolean = false;
online$: Observable<boolean>;
input$: Observable<boolean>;
name: String;
  flightService: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.control = new FormControl();
    // this.closeSubj = new Subject<void>();
    this.input$ = this.control.valueChanges;

    this.flights$ = 
        this.control
            .valueChanges
            .pipe(
              filter((input) => input.length > 3),
                debounceTime(500),
                distinctUntilChanged(),
                tap(input => this.loading = true),
                switchMap(input => this.load(input)),
                tap(v => this.loading = false)
            );
            this.online$  = interval(2000).pipe(
                    startWith(0),
                    map(_ => Math.random() < 0.5),
                    distinctUntilChanged(),
                    tap(value => this.online = value)
            );
            const input$ = this.control.valueChanges.pipe(
              debounceTime(300));
          
          // this.flights$ = combineLatest([input$, this.online$]).pipe(
          //     filter(( [_ , online] ) => online),
          //     map( ([value, _]) => value ),
          //     tap(v => this.loading = true),
          //     switchMap( name => this.load(name) ),
          //     tap(v => this.loading = false),
          // );
          // this.flights$ = combineLatest(this.online$, this.input$).pipe(
          //   filter( ([online, _]) => online ),
          //   map(([_, value]) => value),
          //   distinctUntilChanged(),
          //   switchMap(v => this.flightService.find(v, '')),
          //   takeUntil(this.closeSubj),
          // )
}
  closeSubj(closeSubj: any): any {
    throw new Error("Method not implemented.");
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
