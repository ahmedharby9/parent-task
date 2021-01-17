import {Component, OnInit} from '@angular/core';
import {CallApiService} from '../services/call-api.service';
import {User} from '../models/user';
import {ToastrService} from 'ngx-toastr';

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
  public deleteConfirmMsg: string;

  constructor(private callApi: CallApiService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.onLoadingAllUsers(`page=${this.paging.page}&per_page=${this.paging.per_page}`);
  }

  // tslint:disable-next-line:typedef
  onScroll(event) {
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

  onClickDelete(user): void {
    this.currentSelectedUser = user;
    this.deleteConfirmMsg = `<p>Are you sure you want to delete</p><p class="font-weight-bolder">${user.first_name} ${user.last_name}</p> `;
  }

  onApproveDeleteUser(event): void {
    if (event) {
      this.callApi.deleteUser(this.currentSelectedUser.id).subscribe((res) => {
        this.toastr.success('User has been deleted successfully', 'Deleted Message!');
        this.onLoadingAllUsers(`page=${1}&per_page=${this.paging.per_page * this.paging.page}`);
      });
    }
  }

  onLoadingAllUsers(arg?): void {
    this.callApi.getUsersList(arg).subscribe((res) => {
      this.isLoading = false;
      this.userListInfo = res.data;
      this.paging.page = res.page;
      this.paging.per_page = res.per_page;
      this.paging.total = res.total;
    });
  }

  onEditOrAddUser(): void {
    this.onLoadingAllUsers(`page=${this.paging.page}&per_page=${this.paging.per_page}`);
  }
}
