import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth-jwt/components/login/login.component';
import { HomeComponent } from './commons/home/home.component';
import { AuthJWTGuard } from './auth-jwt/auth-jwt.guard';
import { ErrorsComponent } from './commons/errors/errors.component';
import { PageNotFoundComponent } from './commons/page-not-found/page-not-found.component';
import { Comp1Component } from './commons/comp1/comp1.component';
import { Comp2Component } from './commons/comp2/comp2.component';
import { Comp3Component } from './commons/comp3/comp3.component';

const routes: Routes = [
  {
    path: 'comp1',
    component: Comp1Component,
    canActivate: [AuthJWTGuard],
    canLoad: [AuthJWTGuard]
  },
  {
    path: 'comp2',
    component: Comp2Component,
    canActivate: [AuthJWTGuard],
    canLoad: [AuthJWTGuard]
  },
  {
    path: 'comp3',
    component: Comp3Component,
    canActivate: [AuthJWTGuard],
    canLoad: [AuthJWTGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthJWTGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'error',
    component: ErrorsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
