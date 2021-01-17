import {TestBed} from '@angular/core/testing';

import {HttpConfigInterceptor} from './http-config.interceptor';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('HttpConfigInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        ToastrService,
        HttpConfigInterceptor
      ]
    });
  });

  it('should be created', () => {
    const interceptor: HttpConfigInterceptor = TestBed.inject(HttpConfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
