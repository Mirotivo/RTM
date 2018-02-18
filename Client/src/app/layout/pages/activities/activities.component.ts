import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from "../../../shared/services/activities/activities.service";
import { Activity } from "../../../shared/models/Activity";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { slideToRight } from "../../../router.animations";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  providers: [ActivitiesService],
  animations: [slideToRight()]
})
export class ActivitiesComponent implements OnInit {
  activities : Activity[];
  currentactivity : Activity;
  constructor(private activityService:ActivitiesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.currentactivity = new Activity();
    this.Read();
  }
  trackByIndex(index: number, value: number) {  
    return index;
  }

  ShowMembers : any;
  open(content,activity:Activity) {
    this.currentactivity = activity;
    this.ShowMembers = this.modalService.open(content);
    this.ShowMembers.result.then((close) => { }, (dismiss) => { });
  }
  close() {
      this.ShowMembers.close();
  }
  
  Read() {
    this.activityService.Read().map(res => res.json()).subscribe( (res:any) => { this.activities = res.activities; });
  }

  Delete(activity:Activity) {
    var cfrm = confirm("Are you sure?");
    if (cfrm) {
      this.activityService.Delete(activity).subscribe(
        p => { alert(p.json().message); this.activities.splice(this.activities.indexOf(activity), 1); },
        e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
        () => {  });
    }
  }
}
