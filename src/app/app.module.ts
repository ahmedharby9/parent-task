import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {UsersComponent} from './users/users.component';
import {SingleUserViewComponent} from './single-user-view/single-user-view.component';
import {SingleUserEditComponent} from './single-user-edit/single-user-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_helpers/auth.guard';
import {HeaderComponent} from './header/header.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpConfigInterceptor} from './_helpers/http-config.interceptor';
import {SafePipe} from './pipes/safe.pipe';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'logout', redirectTo: '/login', pathMatch: 'full'},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UsersComponent,
    SingleUserViewComponent,
    SingleUserEditComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    SafePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    InfiniteScrollModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
