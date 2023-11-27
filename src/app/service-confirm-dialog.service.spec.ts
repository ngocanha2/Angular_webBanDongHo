import { TestBed } from '@angular/core/testing';

import { ServiceConfirmDialogService } from './service-confirm-dialog.service';

describe('ServiceConfirmDialogService', () => {
  let service: ServiceConfirmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceConfirmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
