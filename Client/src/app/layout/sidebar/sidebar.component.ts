import { Component, OnInit } from '@angular/core';
import { User } from "../../shared/models/User";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    showMenu: string = '';
    Admin: boolean = false;

    constructor() {
        let user: User = JSON.parse(sessionStorage.getItem('user'));
        if (user.Role == 'Admin') this.Admin = true;
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
