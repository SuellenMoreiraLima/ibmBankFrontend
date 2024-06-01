import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AuthenticatedHomeComponent } from './app/authenticated-home/authenticated-home.component';
import { CreateAccountComponent } from './app/account/create-account/create-account.component';
import { AuthGuard } from './app/account/shared/auth.guard';
import { ClientComponent } from './app/client/client.component';
import { ListClientComponent } from './app/list-client/list-client.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'listClient', component: ListClientComponent },

  /* { path: 'login', component: LoginComponent }, */
  { path: 'client', component: ClientComponent }

  /* { path: '',
   component: HomeComponent,
   children: [
       { path: '', component: TaskListComponent },
  { path: 'new', component: TaskListComponent },
  { path: 'edit:id', component: TaskListComponent }
   ],
   canActivate: [AuthGuard]
   },
   { path: '',
   component: AuthenticatedHomeComponent,
   children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent }
   ]
   } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{};
