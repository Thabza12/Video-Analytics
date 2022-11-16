import { TestBed } from '@angular/core/testing';

import { beforeLoginService } from './before-login.service';

describe('beforeLoginService', () => {
  let service: beforeLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(beforeLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
