import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthJWTGuard } from './auth-jwt.guard';
import { AuthJWTService } from './auth-jwt.service';
import { TokenService } from './token/token.service';
import { TokenStorage } from './token/token-storage';
import { TokenWrapper } from './token/token-wrapper';
import { AuthJWTConfig } from './auth-jwt.config';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent
    ],
    exports: [
        LoginComponent,
        LogoutComponent
    ],
    providers: [
        AuthJWTGuard,
        AuthJWTService,
        TokenService,
        TokenStorage,
        TokenWrapper
    ]
})
export class AuthJWTModule {
    static forRoot(authJWTConfig: AuthJWTConfig): ModuleWithProviders {
        return {
            ngModule: AuthJWTModule,
            providers: [AuthJWTService, { provide: 'authJWTConfig', useValue: authJWTConfig }]
        };
    }
}
