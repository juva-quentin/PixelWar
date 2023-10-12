import { TestBed } from '@angular/core/testing';

import { WebSoketService } from './web-soket.service';

describe('WebSoketService', () => {
  let service: WebSoketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSoketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
