import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {DOMHelper} from '../../testing/dom-helper';
import {Observable, of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {CallApiService} from '../services/call-api.service';
import {ToastrService} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {User} from '../models/user';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {SingleUserEditComponent} from '../single-user-edit/single-user-edit.component';
import {SingleUserViewComponent} from '../single-user-view/single-user-view.component';


describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let dh: DOMHelper<UsersComponent>;
  let userServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('CallApiService', ['getUsersList']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        UsersComponent,
        ConfirmDialogComponent,
        SingleUserEditComponent,
        SingleUserViewComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceMock},

        {provide: CallApiService, useValue: userServiceMock}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<UsersComponent>(fixture);
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  describe('Nav tag content', () => {
    it('should contain of title', () => {
      expect(dh.singleText('h1')).toBe('Users List');
    });
    it('should contain of Home root', () => {
      expect(dh.countText('li', 'Home')).toBe(1);
    });
    it('should contain of Dashboard', () => {
      expect(dh.countText('li', 'Dashboard')).toBe(1);
    });
    it('should contain of button New User', () => {
      expect(dh.countText('button', 'New User')).toBe(1);
    });
  });

  describe('Users table loading and binding ', () => {

    it('Should show One Unordered List Item', () => {
      expect(dh.count('table')).toBe(1);
    });
    it('should contain of empty list', () => {
      expect(dh.count('td')).toBe(0);
    });
    it('should contain at least one user in list', () => {

    });
  });


  xdescribe('login process and authenticate user', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should clear token', () => {
      component.ngOnInit();
      let token = localStorage.getItem('_token');
      expect(token).toBeNull();
    });

    it('should call onSubmit method', () => {
      dh.clickButton('Login');
    });

  });

});
