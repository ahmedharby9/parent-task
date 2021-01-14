import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { SingleUserViewComponent } from './single-user-view/single-user-view.component';
import { SingleUserAddComponent } from './single-user-add/single-user-add.component';
import { SingleUserEditComponent } from './single-user-edit/single-user-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UsersComponent,
    SingleUserViewComponent,
    SingleUserAddComponent,
    SingleUserEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
