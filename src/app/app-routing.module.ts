import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard, UnAuthenticatedGuard } from '@core/guards';
import { InitDataResolver } from '@core/resolvers';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canLoad: [UnAuthenticatedGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule),
    canLoad: [UnAuthenticatedGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthenticatedGuard],
    resolve: {
      initialized: InitDataResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthenticatedGuard,
    UnAuthenticatedGuard,
    InitDataResolver
  ]
})
export class AppRoutingModule {}
