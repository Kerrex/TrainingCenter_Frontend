import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/components/navbar/navbar.component';
import { UserService } from './services/user.service';
import { NavigationStart, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Training Center';
  showMenu = true;
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(public location: Location, private router: Router, private userService: UserService, private translate: TranslateService) {
    $.material.init();
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    console.log(elemMainPanel);

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (this.showMenu && this.navbar != undefined) {
        this.navbar.sidebarClose();
        if (event instanceof NavigationStart) {
          if (event.url != this.lastPoppedUrl)
            this.yScrollStack.push(window.scrollY);
        } else if (event instanceof NavigationEnd) {
          if (event.url == this.lastPoppedUrl) {
            this.lastPoppedUrl = undefined;
            window.scrollTo(0, this.yScrollStack.pop());
          } else
            window.scrollTo(0, 0);
        }
      }
    });
    if (elemMainPanel != null && elemSidebar != null) {
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        let ps = new PerfectScrollbar(elemMainPanel);
        ps = new PerfectScrollbar(elemSidebar);
      }
    }


    this.excludeMenuFromLoginPage();
    this.initI18n();
  }

  private excludeMenuFromLoginPage() {
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.showMenu = !event.url.startsWith("/login") && !event.url.startsWith("/register");
      }
    })
  }

  private initI18n() {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  isAdminUser() {
    return this.userService.isAdminUser();
  }

  isUser() {
    return this.userService.isUser();
  }


  // Dashboard
  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
