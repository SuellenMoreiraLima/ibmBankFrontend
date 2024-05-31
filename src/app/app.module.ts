import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthenticatedHomeComponent } from './authenticated-home/authenticated-home.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/AppRoutingModule.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { ClientComponent } from './client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatedHomeComponent,
    LoginComponent,
    CreateAccountComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
