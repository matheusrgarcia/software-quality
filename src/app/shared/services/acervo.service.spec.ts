import { TestBed } from '@angular/core/testing';

import { AcervoService } from './acervo.service';

describe('AcervoService', () => {
  let service: AcervoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcervoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
