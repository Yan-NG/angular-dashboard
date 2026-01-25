import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'addUser', pathMatch: 'full'},
  {path: 'addUser', loadComponent: () => import('./components/form-users/form-users').then(m => m.FormUsers)},
];
