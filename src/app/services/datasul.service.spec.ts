import { TestBed } from '@angular/core/testing';

import { DatasulService } from './datasul.service';

describe('DatasulService', () => {
  let service: DatasulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
