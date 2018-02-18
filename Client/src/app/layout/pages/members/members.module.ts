import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MembersRoutingModule } from './members-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MembersComponent } from './members.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    MembersRoutingModule,
    NgxDatatableModule
  ],
  declarations: [MembersComponent]
})
export class MembersModule { }
