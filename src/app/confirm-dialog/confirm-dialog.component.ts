import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() Message: string;
  @Output() onCallback: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('closeBtnRef') closeBtnRef: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  onApprove(): void {
    this.onCallback.emit(true);
    this.closeBtnRef.nativeElement.click();
  }
}
