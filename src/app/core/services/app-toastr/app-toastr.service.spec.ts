import { TestBed } from '@angular/core/testing';

import { AppToastrService } from 'src/app/core/services/app-toastr/app-toastr.service';

describe('AppToastrService', () => {
  let service: AppToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
