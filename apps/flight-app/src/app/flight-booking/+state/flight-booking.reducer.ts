import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';
import { flightsLoaded, updateFlight } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[]
}

export const initialState: State = {
  flights: []
};

export interface FlightBookingAppState {
  flightBooking: State
}

// export const flightBookingReducer = createReducer(
export const reducer = createReducer(
  initialState,

  // on(FlightBookingActions.loadFlightBookings, state => state),
  on(flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),
  // New:
  on(updateFlight, (state, action) => {
    const flight = action.flight;
    const flights = state.flights.map(f => f.id === flight.id? flight: f);
    return { ...state, flights };
  }),

);

