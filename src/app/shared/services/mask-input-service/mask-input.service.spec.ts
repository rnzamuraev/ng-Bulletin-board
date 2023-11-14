import { TestBed } from '@angular/core/testing';

import { MaskInputService } from './mask-input.service';

describe('MaskInputService', () => {
  let service: MaskInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaskInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
