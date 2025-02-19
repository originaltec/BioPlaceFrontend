import { TestBed } from '@angular/core/testing';

import { AuroralService } from './auroral.service';

describe('AuroralService', () => {
  let service: AuroralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuroralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
