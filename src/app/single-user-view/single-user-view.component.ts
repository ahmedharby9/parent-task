import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../models/user';
import {CallApiService} from '../services/call-api.service';

@Component({
  selector: 'app-single-user-view',
  templateUrl: './single-user-view.component.html',
  styleUrls: ['./single-user-view.component.css']
})
export class SingleUserViewComponent implements OnInit, OnChanges {
  @Input() display: boolean;
  @Input() data: User;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  public userInfo: User;

  constructor(private callApi: CallApiService) {
  }

  ngOnInit(): void {

  }

  setCloseSide(): void {
    this.display = !this.display;
    this.onClose.emit(false);
  }

  onClickDelete(): void {
    this.onDelete.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      if (this.data.id) {
        this.callApi.getOneUser(this.data.id).subscribe((res) => {
          this.userInfo = res.data;
        });
      }
    }
  }
}
