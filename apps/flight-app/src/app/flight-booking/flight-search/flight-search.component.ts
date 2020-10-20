import {Component, OnInit} from '@angular/core';
import {FlightService, Flight} from '@flight-workspace/flight-lib';
import { flightsLoaded } from '../+state/flight-booking.actions';
import { Observable } from 'rxjs/internal/Observable';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };
  flights$: Observable<Flight[]>;

  constructor(
    private flightService: FlightService,
    private store: Store<FlightBookingAppState>) {
  }

  ngOnInit() {
    this.flights$ = this.store.select(s => s.flightBooking.flights);
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .find(this.from, this.to, this.urgent)
      .subscribe(
        flights => { 
          this.store.dispatch(flightsLoaded({flights}));
        },
        error => {
          console.error('error', error);
        } 
      );
  }

  delay(): void {
    this.flightService.delay();
  }

}
