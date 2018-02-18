import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { slideToRight } from '../router.animations';
import { UsersService } from "../shared/services/users/users.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ UsersService ],
    animations: [slideToRight()]
})
export class LoginComponent implements OnInit {
    LoginForm : FormGroup;
    Invalid: boolean = false;
    constructor(private userService: UsersService, private router: Router) {}

    ngOnInit() {
        this.LoginForm = new FormGroup({
            Email: new FormControl('',[Validators.required]),
            Password: new FormControl('',[Validators.required])
        } );
    }

    ngOnSubmit(FormValue) {
        this.Invalid = false;
        this.userService.Login(FormValue).subscribe(
        p => {
            let user = p.json().user;
            if (user != null) { sessionStorage.setItem('isLoggedin', 'true'); sessionStorage.setItem('user', JSON.stringify(user)); this.router.navigate(['/activities']); }
            else { this.Invalid = true; }
        },
        e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
        () => {  });
    }
}
