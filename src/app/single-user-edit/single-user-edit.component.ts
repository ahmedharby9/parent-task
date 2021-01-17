import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CallApiService} from '../services/call-api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-single-user-edit',
  templateUrl: './single-user-edit.component.html',
  styleUrls: ['./single-user-edit.component.css']
})
export class SingleUserEditComponent implements OnInit, OnChanges {
  @Input() data: User;
  @Output() onCallBack: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('closebutton') closeButton;
  public userInfo: FormGroup;

  constructor(private fb: FormBuilder, private callApi: CallApiService, private toast: ToastrService) {
    this.userInfo = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
      this.userInfo.reset();
      this.userInfo.setValue({name: this.data.first_name ?? '', job: ''});
    }
  }

  // tslint:disable-next-line:typedef
  onSubmitUpdate() {
    if (this.userInfo.invalid) {
      return;
    }
    this.callApi.putUpdateUser(this.data.id, this.userInfo.value).subscribe((res) => {
      this.toast.success('User data has been updated successfully', 'Updated Message!');
      this.onCallBack.emit(true);
      console.log(this.closeButton.nativeElement);
      this.closeButton.nativeElement.click();
    });
  }


  // tslint:disable-next-line:typedef
  onSubmitCreate() {
    if (this.userInfo.invalid) {
      return;
    }
    this.callApi.postNewUser(this.userInfo.value).subscribe((res) => {
        this.toast.success('User data has been created successfully', 'Create Message!');
        this.onCallBack.emit(true);
        this.closeButton.nativeElement.click();
      }
    );
  }
}
