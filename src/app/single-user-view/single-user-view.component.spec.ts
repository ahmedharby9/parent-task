import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleUserViewComponent} from './single-user-view.component';
import {DOMHelper} from '../../testing/dom-helper';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrService} from 'ngx-toastr';
import {CallApiService} from '../services/call-api.service';
import {SafePipe} from '../pipes/safe.pipe';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';


describe('SingleUserViewComponent', () => {
  let component: SingleUserViewComponent;
  let fixture: ComponentFixture<SingleUserViewComponent>;
  let dh: DOMHelper<SingleUserViewComponent>;
  let userServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('CallApiService', ['getUsersList']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        SingleUserViewComponent,
        SafePipe
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
    fixture = TestBed.createComponent(SingleUserViewComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<SingleUserViewComponent>(fixture);
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  describe('component html content', () => {
    beforeEach(() => {
      component.display = true;
      fixture.detectChanges();
    });
    it('should not contain of img because it was closed', () => {
      component.display = false;
      fixture.detectChanges();
      expect(dh.count('img')).toBe(0);
    });
    it('should contain of close button', () => {
      expect(dh.count('.close')).toBe(1);
    });

    it('should contain of one img', () => {
      expect(dh.count('img')).toBe(1);
    });
    it('should contain of edit button', () => {
      expect(dh.countText('button', 'Edit')).toBe(1);
    });
    it('should contain of edit icon in edit button', () => {
      expect(dh.countSubTags('button', 'bi-pencil-fill')).toBe(1);
    });
    it('should contain of delete button', () => {
      expect(dh.countText('button', 'Delete')).toBe(1);
    });
    it('should contain of delete icon in delete button', () => {
      expect(dh.countSubTags('button', 'bi-trash-fill')).toBe(1);
    });
  });
  describe('Component binding ', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });
    it('should data @input have not value ', () => {
      expect(component.data).toBeUndefined();
    });
    it('should data @input have data ', () => {
      helper.getUsers(1).subscribe((res) => {
        component.data = res[0];
      });
      fixture.detectChanges();
      expect(component.data.id).toBe(0);
    });
    it('should contain first  name and last name ', () => {
      component.display = true;
      helper.getUsers(1).subscribe((res) => {
        component.userInfo = res[0];
      });
      fixture.detectChanges();
      expect(dh.singleText('h3')).toBe(component.userInfo.first_name + ' ' + component.userInfo.last_name);
    });
    it('should call setCloseSide method at lest once  ', () => {
      spyOn(component, 'setCloseSide');
      component.display = true;
      fixture.detectChanges();
      dh.clickButtonByProp('className', 'close');
      expect(component.setCloseSide).toHaveBeenCalled();
    });
    it('should call on close emit true ', () => {
      spyOn(component.onClose, 'emit');
      component.display = true;
      fixture.detectChanges();
      dh.clickButtonByProp('className', 'close');
      expect(component.onClose.emit).toHaveBeenCalledWith(false);
    });

    it('should  method called at lest once  ', () => {
      spyOn(component, 'onClickDelete');
      component.display = true;
      fixture.detectChanges();
      dh.findAll('button')[2].nativeElement.click();
      expect(component.onClickDelete).toHaveBeenCalled();
    });
    it('should call when click on delete button and emit true ', () => {
      spyOn(component.onDelete, 'emit');
      component.display = true;
      fixture.detectChanges();
      dh.findAll('button')[2].nativeElement.click();
      expect(component.onDelete.emit).toHaveBeenCalledWith(true);
    });
  });
});

class Helper {
  users: User [] = [];

  getUsers(amount: number): Observable<User[]> {
    for (let i = 0; i < amount; i++) {
      this.users.push(
        {id: i, first_name: 'user' + i, last_name: 'last' + i, avatar: 'http://img' + i}
      );
    }
    return of(this.users);
  }
}
