import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleUserEditComponent} from './single-user-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CallApiService} from '../services/call-api.service';
import {DOMHelper} from '../../testing/dom-helper';
import {User} from '../models/user';
import {SafePipe} from '../pipes/safe.pipe';

describe('SingleUserEditComponent', () => {
  let component: SingleUserEditComponent;
  let fixture: ComponentFixture<SingleUserEditComponent>;
  let dh: DOMHelper<SingleUserEditComponent>;
  let userServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('CallApiService', ['getOneUser']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        SingleUserEditComponent,
        SafePipe
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
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
    fixture = TestBed.createComponent(SingleUserEditComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<SingleUserEditComponent>(fixture);
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  describe('Create mode content', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });

    it('should not contain of img ', () => {
      component.data = helper.getUsers();
      fixture.detectChanges();
      expect(dh.count('img')).toBe(1);
    });
    it('should return call onSubmitUpdate and create new one ', () => {
      spyOn(component.onCallBack, 'emit');
      spyOn(component, 'onSubmitCreate');
      component.data = {};
      component.userInfo.setValue({name: 'null', job: 'kmk'});
      fixture.detectChanges();
      dh.clickButton('Add');
      expect(component.onSubmitCreate).toHaveBeenCalled();
    });
  });
});

class Helper {
  users: User [] = [];

  getUsers(): any {
    return {id: 1, first_name: 'user', last_name: 'last', avatar: 'http://img'};
  }
}

