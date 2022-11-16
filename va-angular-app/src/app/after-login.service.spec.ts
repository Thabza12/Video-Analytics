import { TestBed } from '@angular/core/testing';

import { afterLoginService } from './after-login.service';

describe('afterLoginService', () => {
  let service: afterLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(afterLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
