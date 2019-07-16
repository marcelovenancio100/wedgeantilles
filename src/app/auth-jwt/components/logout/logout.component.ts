import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthJWTService } from '../../auth-jwt.service';
import { AuthJWTResult } from '../../auth-jwt.result';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  redirectDelay: number = 0;

  constructor(private router: Router,
              private authJWTService: AuthJWTService) {

    this.redirectDelay = 0;
  }

  ngOnInit() {}

  logout(): void {
    this.authJWTService.logout().subscribe((authJWTResult: AuthJWTResult) => {
      setTimeout(() => {
        return this.router.navigateByUrl('/');
      }, this.redirectDelay);
    });
  }
}
