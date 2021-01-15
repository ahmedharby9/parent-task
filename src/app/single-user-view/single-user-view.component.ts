import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-single-user-view',
  templateUrl: './single-user-view.component.html',
  styleUrls: ['./single-user-view.component.css']
})
export class SingleUserViewComponent implements OnInit {
  @Input() display: boolean;
  @Input() data: User;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  setCloseSide() {
    this.display = !this.display;
    this.onClose.emit(false);
  }
}
