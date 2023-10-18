import { TestBed } from '@angular/core/testing';

import { TourismService } from './tourism.service';

describe('TourismService', () => {
  let service: TourismService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourismService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
