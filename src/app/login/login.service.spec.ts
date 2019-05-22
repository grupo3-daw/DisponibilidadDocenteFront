import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

// tslint:disable
describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientModule]
    }).compileComponents();
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
