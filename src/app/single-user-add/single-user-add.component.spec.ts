import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserAddComponent } from './single-user-add.component';

describe('SingleUserAddComponent', () => {
  let component: SingleUserAddComponent;
  let fixture: ComponentFixture<SingleUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleUserAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
