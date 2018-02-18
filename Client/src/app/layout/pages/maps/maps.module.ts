import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapsRoutingModule } from './maps-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MapsComponent } from './maps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),    
    MapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwexpuImtVcTQZGgrGhqtGuNaIKlsflj0'
    })
  ],
  declarations: [MapsComponent]
})
export class MapsModule { }
