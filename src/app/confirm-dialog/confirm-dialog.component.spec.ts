import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDialogComponent} from './confirm-dialog.component';
import {DOMHelper} from '../../testing/dom-helper';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dh: DOMHelper<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<ConfirmDialogComponent>(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component html content', () => {
    it('should bind message as html', () => {
      component.Message = `<h3>welcome</h3>`;
      fixture.detectChanges();
      expect(dh.count('h3')).toBe(1);
    });
    it('should call onApprove method when click on save', () => {
      spyOn(component, 'onApprove');
      fixture.detectChanges();
      dh.clickButton('Save');
      expect(component.onApprove).toHaveBeenCalled();
    });
    it('should call onApprove method when click on save', () => {
      spyOn(component.onCallback, 'emit');
      dh.clickButton('Save');
      fixture.detectChanges();
      expect(component.onCallback.emit).toHaveBeenCalledWith(true);
    });
  });
});
