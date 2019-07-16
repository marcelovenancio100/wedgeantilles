import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthJWTModule } from './auth-jwt/auth-jwt.module';
import { HomeComponent } from './commons/home/home.component';
import { ErrorsComponent } from './commons/errors/errors.component';
import { PageNotFoundComponent } from './commons/page-not-found/page-not-found.component';
import { Comp1Component } from './commons/comp1/comp1.component';
import { Comp2Component } from './commons/comp2/comp2.component';
import { Comp3Component } from './commons/comp3/comp3.component';
import { TokenInterceptor } from './auth-jwt/token/token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorsComponent,
    PageNotFoundComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthJWTModule.forRoot({
      baseEndpoint: 'http://localhost:8080'
    })
  ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }]

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
