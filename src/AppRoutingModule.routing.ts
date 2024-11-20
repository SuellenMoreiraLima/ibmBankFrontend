import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { CreateAccountComponent } from './app/account/create-account/create-account.component';
import { ClientComponent } from './app/client/client.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'client', component: ClientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{};
