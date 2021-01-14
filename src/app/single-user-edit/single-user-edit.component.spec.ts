import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserEditComponent } from './single-user-edit.component';

describe('SingleUserEditComponent', () => {
  let component: SingleUserEditComponent;
  let fixture: ComponentFixture<SingleUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleUserEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
