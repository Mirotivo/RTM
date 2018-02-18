import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MessagesComponent } from './messages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MessagesRoutingModule
  ],
  declarations: [MessagesComponent]
})
export class MessagesModule { }
