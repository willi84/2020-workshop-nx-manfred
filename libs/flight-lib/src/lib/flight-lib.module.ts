import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FlightService} from './services/flight.service';
import { AirportService } from './services/airport.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class FlightLibModule {
  static forRoot(): ModuleWithProviders<FlightLibModule> {
    return {
      ngModule: FlightLibModule,
      providers: [
        FlightService
      ]
    }
  }
}

