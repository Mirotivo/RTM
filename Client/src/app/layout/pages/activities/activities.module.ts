import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ActivitiesComponent } from './activities.component';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  declarations: [ActivitiesComponent]
})
export class ActivitiesModule { }