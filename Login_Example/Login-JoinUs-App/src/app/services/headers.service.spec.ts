import { TestBed } from '@angular/core/testing';

import { HeadersService } from './headers.service';

describe('HeadersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadersService = TestBed.get(HeadersService);
    expect(service).toBeTruthy();
  });
});
