import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
