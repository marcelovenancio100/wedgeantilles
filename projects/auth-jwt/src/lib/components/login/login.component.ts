import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthJWTService } from '../../auth-jwt.service';
import { AuthJWTResult } from '../../auth-jwt.result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  errors: string[] = [];
  messages: string[] = [];

  constructor(private router: Router,
              private authJWTService: AuthJWTService) {}

  ngOnInit() {}

  login(): void {
    this.errors = [];
    this.messages = [];

    this.authJWTService.authenticate(this.user).subscribe((authJWTResult: AuthJWTResult) => {
      if (authJWTResult.isSuccess()) {
        this.messages = authJWTResult.getMessages();
        this.router.navigateByUrl('/home');
      } else {
        this.errors = authJWTResult.getErrors();
      }
    });
  }
}
