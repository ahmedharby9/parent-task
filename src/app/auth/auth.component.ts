import {Component, OnInit} from '@angular/core';
import {CallApiService} from '../services/call-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [CallApiService]
})
export class AuthComponent implements OnInit {
  public userLoginInfo: FormGroup;
  public disableBtn: boolean;

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.userLoginInfo = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.disableBtn = false;
  }

  ngOnInit(): void {
    this.callApi.setLogout();
  }

  onSubmit(): void {
    if (this.userLoginInfo.invalid) {
      return;
    }
    this.disableBtn = true;

    this.callApi.setLogin(this.userLoginInfo.value).subscribe((res) => {
      localStorage.setItem('_token', res.token);
      this.toastr.success('Login success', 'Success Message!');
      setTimeout(() => {
        this.router.navigateByUrl('/users');
      }, 1000);

    });
    setTimeout(() => this.disableBtn = true, 5000);
  }

}
