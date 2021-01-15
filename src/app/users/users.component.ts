import {Component, OnInit} from '@angular/core';
import {CallApiService} from '../services/call-api.service';
import {User} from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public paging: any = {page: 1, per_page: 8};
  public userListInfo: User[] = [];
  public isLoading: boolean;
  public currentSelectedUser: User;
  public viewUserSide: boolean;

  constructor(private callApi: CallApiService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.callApi.getUsersList(`page=${this.paging.page}&per_page=${this.paging.per_page}`).subscribe((res) => {
      this.isLoading = false;
      this.userListInfo = res.data;
      this.paging.page = res.page;
      this.paging.per_page = res.per_page;
      this.paging.total = res.total;
    });
  }

  // tslint:disable-next-line:typedef
  onScroll(event) {
    console.log(Math.ceil(this.paging.total / this.paging.per_page));
    if (this.paging.page < (Math.ceil(this.paging.total / this.paging.per_page))) {
      this.isLoading = true;
      this.callApi.getUsersList(`page=${this.paging.page + 1}&per_page=${this.paging.per_page}`).subscribe((res) => {
        this.isLoading = false;
        this.userListInfo = this.userListInfo.concat(...res.data);
        this.paging.page = res.page;
        this.paging.per_page = res.per_page;
        this.paging.total = res.total;
      });
    }

  }

}
