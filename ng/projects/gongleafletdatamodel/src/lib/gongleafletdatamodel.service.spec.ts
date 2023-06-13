import { TestBed } from '@angular/core/testing';

import { GongleafletdatamodelService } from './gongleafletdatamodel.service';

describe('GongleafletdatamodelService', () => {
  let service: GongleafletdatamodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GongleafletdatamodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
