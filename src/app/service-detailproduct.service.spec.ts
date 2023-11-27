import { TestBed } from '@angular/core/testing';

import { ServiceDetailproductService } from './service-detailproduct.service';

describe('ServiceDetailproductService', () => {
  let service: ServiceDetailproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDetailproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
