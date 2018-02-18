import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../shared/services/users/users.service";
import { User } from "../../../shared/models/User";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { slideToRight } from "../../../router.animations";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [UsersService],
  animations: [slideToRight()]
})
export class MembersComponent implements OnInit {
  users : User[];
  currentuser : User;
  Admin : boolean = false;
  constructor(private userService:UsersService, private modalService: NgbModal) {
    let user: User = JSON.parse(sessionStorage.getItem('user'));
    if (user.Role == 'Admin') this.Admin = true;
  }

  ngOnInit() {
    this.currentuser = new User();
    this.Read();
  }
  trackByIndex(index: number, value: number) {  
    return index;
  }

  Read() {
    this.userService.Read().map(res => res.json()).subscribe( (res:any) => { this.users = res.users; });
  }
  Update(user:User) {
    var cfrm = confirm("Are you sure?");
    if (cfrm) {
      this.userService.Update(user).subscribe(
        p => { alert(p.json().message); this.close(); },
        e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
        () => {  });
    }
  }
  Delete(user:User) {
    var cfrm = confirm("Are you sure?");
    if (cfrm) {
      this.userService.Delete(user).subscribe(
        p => { alert(p.json().message); this.users.splice(this.users.indexOf(user), 1); },
        e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
        () => {  });
    }
  }

  Print() {
    this.userService.Print().map(
        (res) => { return new Blob([res.blob()], { type: 'application/pdf' }); }
      ).subscribe(
        (res: Blob) => { window.open(URL.createObjectURL(res), '_blank'); }
      );
  }

  EditModal : any;
  open(content,user:User) {
    this.currentuser = user;
    this.EditModal = this.modalService.open(content);
    this.EditModal.result.then((close) => { }, (dismiss) => { });
  }
  close() {
      this.EditModal.close();
  }
}