import { TestBed } from '@angular/core/testing';

import { CarpoolsByService } from './carpools-by.service';

describe('CarpoolsByService', () => {
  let service: CarpoolsByService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarpoolsByService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
