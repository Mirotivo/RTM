import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { slideToLeft } from '../router.animations';
import { UsersService } from "../shared/services/users/users.service";
import { User } from "../shared/models/User";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [ UsersService ],
    animations: [slideToLeft()]
})
export class SignupComponent implements OnInit {
    user : User;
    RegisterForm : FormGroup;
    Failed: boolean = false;

    constructor(private userService: UsersService, private router: Router) {
    }

    ngOnInit() {
        this.user = new User();
        this.user.Role = 'Standard';
        this.RegisterForm = new FormGroup({
            FirstName: new FormControl('',[Validators.required]),
            LastName: new FormControl('',[Validators.required]),
            Email: new FormControl('',[Validators.required, Validators.email]),
            Password: new FormControl('',[Validators.required]),
            ConfirmPassword: new FormControl('',[Validators.required])
        }, 
            function(AC: AbstractControl) {
                if (AC.get('Password').value != AC.get('ConfirmPassword').value) { AC.get('ConfirmPassword').setErrors({ MatchPassword: true }); }
                else { return null }
            }
        );
    }

    
    ngOnSubmit(FormValue) {
        this.Failed = false;
        this.userService.Create(this.user).subscribe(
        p => {
            let user = p.json().user;
            if (user != null) { sessionStorage.setItem('isLoggedin', 'true'); sessionStorage.setItem('user', JSON.stringify(user)); this.router.navigate(['/activities']); }
            else { this.Failed = true; }
        },
        e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
        () => {  });
    }
}
