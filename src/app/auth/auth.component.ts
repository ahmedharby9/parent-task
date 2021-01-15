import {Component, OnInit} from '@angular/core';
import {CallApiService} from '../services/call-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public userLoginInfo: FormGroup;

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.userLoginInfo = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.callApi.setLogout();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.userLoginInfo.invalid) {
      return;
    }
    this.callApi.setLogin(this.userLoginInfo.value).subscribe((res) => {
      localStorage.setItem('_token', res.token);
      this.toastr.success('ddfdfefe', 'Server Error!');
      setTimeout(() => {
        this.router.navigateByUrl('/users');
      }, 1000);

    });
  }

}
