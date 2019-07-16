import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthJWTComponent } from './auth-jwt.component';

describe('AuthJWTComponent', () => {
  let component: AuthJWTComponent;
  let fixture: ComponentFixture<AuthJWTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthJWTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthJWTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
