import { TestBed } from '@angular/core/testing';

import { AuthJWTService } from './auth-jwt.service';

describe('AuthJWTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthJWTService = TestBed.get(AuthJWTService);
    expect(service).toBeTruthy();
  });
});
