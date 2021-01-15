import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  public path: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.path = environment.apiUrl;
  }

  /* *****************************************
   *              Login                    *
   ******************************************/

  // tslint:disable-next-line:typedef
  checkToken() {
    const token = localStorage.getItem('_token');
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

  setLogin(body): Observable<any> {
    return this.http.post(`${this.path}/login`, body);
  }

  setLogout(): Observable<any> {
    localStorage.removeItem('_token');
    return;
  }

  getUsersList(page): Observable<any>{
    return this.http.get(`${this.path}/users?${page}`);
  }
}
