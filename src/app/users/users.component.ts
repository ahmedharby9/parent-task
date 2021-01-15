import {Component, OnInit} from '@angular/core';
import {CallApiService} from '../services/call-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public paging: any = {};
  public userListInfo: any[] = [];

  constructor(private callApi: CallApiService) {
  }

  ngOnInit(): void {
    this.callApi.getUsersList({}).subscribe((res) => {
      this.userListInfo = res.data;
    });
  }

}
