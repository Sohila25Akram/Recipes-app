import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['request'])
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call HttpClient.request with correct arguments', () => {
    const expectedData = {result: 'success'};

    httpClientSpy.request.and.returnValue(of(expectedData));

    service.request('GET', '/test-endpoint', {params: {id: 1}}).subscribe(data => {
      expect(data).toEqual(expectedData);
    })

    expect(httpClientSpy.request).toHaveBeenCalledWith('GET', '/test-endpoint', { params: { id: 1 } });
  })
});
