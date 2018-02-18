import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { UsersService } from '../../../shared/services/users/users.service';
import { User } from '../../../shared/models/User';
import { Data } from '@angular/router/src/config';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [ChatService,UsersService]
})
export class MessagesComponent implements OnInit {

  users: User[];
  activeuser: User;
  messages: any[];
  activemessage: string;
  
  constructor(private chatService: ChatService, private userService:UsersService) {
    this.activeuser = new User();
  }

  ngOnInit() {
    let sender: User = JSON.parse(sessionStorage.getItem('user'));    
    this.userService.Read().map(res => res.json()).subscribe( (res:any) => { this.users = res.users.filter(function(item) { return item._id !== sender._id }); this.activeuser = this.users[0]; });    
    this.chatService.ReceiveMessage().subscribe((envelope: any) => { if(this.messages == null) this.messages = []; this.messages.push(envelope); this.scrollToEnd(); });
  }
  
  SelectUser(event,activeuser) {
    this.activeuser = activeuser;
    let user: User = JSON.parse(sessionStorage.getItem('user'));        
    this.chatService.Read(user,activeuser).map(res => res.json()).subscribe( (res:any) => { this.messages = res.messages; this.scrollToEnd(); });    
  }

  sendMessage() {
    let sender: User = JSON.parse(sessionStorage.getItem('user'));
    let receiver: User = this.activeuser;
    let envelope = { Sender:sender, Receiver:receiver, Message:this.activemessage };
    if(this.messages == null) this.messages = [];
    this.messages.push(envelope);
    this.chatService.SendMessage(envelope);
    this.activemessage = '';
    this.scrollToEnd();
  }

  scrollToEnd() {
    setTimeout(function(){
      var container_base = document.getElementById("msg_container_base");
      container_base.scrollTop = container_base.scrollHeight;
    }, 100);
  }
  direction(message) {
    let sender: User = JSON.parse(sessionStorage.getItem('user'));
    return (sender._id == message.Sender._id)? "Right":"Left";
  }
}
