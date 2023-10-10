import { TestBed } from '@angular/core/testing';

import { DadataInterceptorService } from './dadata-interceptor.service';

describe('DadataInterceptorService', () => {
  let service: DadataInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadataInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
