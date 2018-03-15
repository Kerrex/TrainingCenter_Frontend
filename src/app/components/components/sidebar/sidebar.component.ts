import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'sidebar.tab.home', icon: 'dashboard', class: '' },
    { path: 'measurements', title: 'sidebar.tab.measurements', icon: 'bubble_chart', class: ''},
    { path: 'calendar', title: 'sidebar.tab.calendar', icon: "date_range", class: ''},
    { path: 'training-plans', title: 'sidebar.tab.training-plans', icon: 'featured_play_list', class: ''},
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

export const ADMIN_ROUTES: RouteInfo[] = [
    { path: 'exercises', title: "sidebar.tab.exercises", icon: 'content_paste', class: ''},
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  adminMenuItems: any[];

  constructor(public translate: TranslateModule, private userService: UserService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (this.userService.isAdminUser()) {
        this.adminMenuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
