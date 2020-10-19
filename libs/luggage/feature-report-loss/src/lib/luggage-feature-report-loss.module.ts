import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { LuggageDomainModule } from '@flight-workspace/luggage/domain';
import { ReportLossComponent } from './report-loss.component';

// violates our architecture
// import { LuggageFeatureCheckinModule } from '@flight-workspace/luggage/feature-checkin';
// import { FlightLibModule } from '@flight-workspace/flight-lib';

@NgModule({
  imports: [
    CommonModule, 
    LuggageDomainModule,
    // LuggageFeatureCheckinModule,
    // FlightLibModule
    // Add this:
    RouterModule.forChild([
      { path: '', component: ReportLossComponent }
    ])
  ],
  declarations: [ReportLossComponent],
  exports: [ReportLossComponent],
})
export class LuggageFeatureReportLossModule {}
