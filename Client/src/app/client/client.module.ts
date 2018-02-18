import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    HttpModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    LayoutModule
  ],
  declarations: [ClientComponent]
})
export class ClientModule { }
