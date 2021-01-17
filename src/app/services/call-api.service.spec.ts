import {TestBed} from '@angular/core/testing';

import {CallApiService} from './call-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';

describe('CallApiService', () => {
  let service: CallApiService;
  let httpMpck: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],

    });
    service = TestBed.inject(CallApiService);
    httpMpck = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMpck.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Call all services', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      let store = {};
      const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
          store[key] = `${value}`;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        }
      };
      spyOn(localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear')
        .and.callFake(mockLocalStorage.clear);
    });

    it('should retrieve users form api', () => {
      const usersList = helper.getUsers(6);

      service.getUsersList('').subscribe((res) => {
        expect(res.length).toBe(6);
      });
      const request = httpMpck.expectOne(`${service.path}/users?`);
      expect(request.request.method).toBe('GET');
      request.flush(usersList);
    });
    it('should retrieve one user form api', () => {
      const usersList = helper.getUsers(1);

      service.getOneUser(1).subscribe((res) => {
        expect(res.length).toBe(1);
      });
      const request = httpMpck.expectOne(`${service.path}/users/1`);
      expect(request.request.method).toBe('GET');
      request.flush(usersList);
    });
    it('should call delete user api', () => {
      const usersList = helper.getUsers(2);

      service.deleteUser(1).subscribe((res) => {
      });
      const request = httpMpck.expectOne(`${service.path}/users/1`);
      expect(request.request.method).toBe('DELETE');
      request.flush(usersList);
    });
    it('should call update user api', () => {
      const usersList = helper.getUsers(2);

      service.putUpdateUser(1, {}).subscribe((res) => {
      });
      const request = httpMpck.expectOne(`${service.path}/users/1`);
      expect(request.request.method).toBe('PUT');
      request.flush(usersList);
    });
    it('should post new user ', () => {
      const usersList = helper.getUsers(1);

      service.postNewUser(usersList[0]).subscribe((res) => {
      });
      const request = httpMpck.expectOne(`${service.path}/users`);
      expect(request.request.method).toBe('POST');
      request.flush(usersList);
    });

    it('should check token and return false ', () => {
      expect(service.checkToken()).toBeFalsy();
    });
    it('should check token and return false ', () => {
      localStorage.setItem('_token', 'anothertoken');
      expect(service.checkToken()).toBeTrue();
    });
  });

});

class Helper {
  users: User [] = [];

  getUsers(amount: number): any {
    for (let i = 0; i < amount; i++) {
      this.users.push(
        {id: i, first_name: 'user' + i, last_name: 'last' + i, avatar: 'http://img' + i}
      );
    }
    return this.users;
  }
}

