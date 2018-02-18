import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../shared/services/users/users.service";
import { User } from "../../../shared/models/User";
import { slideToBottom, slideToTop } from "../../../router.animations";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UsersService],
  animations: [slideToBottom()]
})
export class ProfileComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UsersService) { }

  ngOnInit() {
    let user: User = JSON.parse(sessionStorage.getItem('user'));
    this.userService.FindById(user).subscribe(
    p => {
        let user = p.json().user;
        if (user != null) { this.user = user; }
    },
    e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
    () => {  });
  }

  Send() {
    this.userService.Update(this.user).subscribe(
      p => { alert(p.json().message); },
      e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
      () => {  });
  }

}
