import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {DOMHelper} from '../../testing/dom-helper';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CallApiService} from '../services/call-api.service';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let dh: DOMHelper<AuthComponent>;
  let userServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('CallApiService', ['setLogin']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        AuthComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceMock},
        {provide: CallApiService, useValue: userServiceMock},
        {provide: Router, useClass: RouterStub}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<AuthComponent>(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Embedded Html tags content', () => {
    it('should contain of title', () => {
      expect(dh.singleText('h1')).toBe('Welcome Back!');
    });
    it('should contain of Username label', () => {
      expect(dh.countText('label', 'Username')).toBe(1);
    });
    it('should contain of Password label', () => {
      expect(dh.countText('label', 'Password')).toBe(1);
    });
    it('should contain of button login', () => {
      expect(dh.countText('button', 'Login')).toBe(1);
    });
  });

  describe('Embedded Html tags count', () => {
    it('should contain of form', () => {
      expect(dh.count('form')).toBe(1);
    });
    it('should contain of two inputs', () => {
      expect(dh.count('input')).toBe(2);
    });
    it('should contain of username label', () => {
      expect(dh.count('input')).toBe(2);
    });
  });


  describe('login form controller', () => {
    it('should the form invalid when empty', () => {
      expect(component.userLoginInfo.valid).toBeFalsy();
    });

    it('username field validity', () => {
      let email = component.userLoginInfo.controls['email'];
      expect(email.valid).toBeFalsy();

      email.setValue('');
      expect(email.hasError('required')).toBeTruthy();
    });

    it('password field validity', () => {
      let pass = component.userLoginInfo.controls['password'];
      expect(pass.valid).toBeFalsy();

      pass.setValue('');
      expect(pass.hasError('required')).toBeTruthy();
    });

  });

  describe('login process and authenticate user', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });

    it('should clear token', () => {
      component.ngOnInit();
      let token = localStorage.getItem('_token');
      expect(token).toBeNull();
    });

    it('should call onSubmit method', () => {
      spyOn(component, 'onSubmit');
      dh.clickButton('Login');
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should to call api if valid form', fakeAsync(() => {
      userServiceMock.setLogin.and.returnValue(helper.login());
      component.userLoginInfo.setValue({email: 'eve.holt@reqres.in', password: 'cityslicka'});
      dh.clickButton('Login');
      localStorage.setItem('_token', 'test');
      fixture.detectChanges();
      take(1000);
      expect(localStorage.getItem('_token')).toBe('test');
    }));
    it('should return if do not set mail', fakeAsync(() => {
      userServiceMock.setLogin.and.returnValue(helper.login());
      component.userLoginInfo.setValue({email: null, password: 'cityslicka'});
      dh.clickButton('Login');
      fixture.detectChanges();
      take(1000);
      expect(localStorage.getItem('_token')).toBeNull();
    }));
  });
});

class Helper {
  users: any = {};

  login(): Observable<any> {
    return of({token: 'test'});
  }
}
