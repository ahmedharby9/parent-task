import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(localStorage.getItem('_token'));
        if (event.urlAfterRedirects.includes('login') || event.url.includes('login')) {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      }

    });
  }

}
