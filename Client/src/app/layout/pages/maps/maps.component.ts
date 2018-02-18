import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../../shared/services/maps/maps.service';
import { Location } from "../../../shared/models/Location";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { slideToRight } from "../../../router.animations";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  providers: [MapsService],
  animations: [slideToRight()]  
})
export class MapsComponent implements OnInit {
  locations : Location[];
  Name: string = "";
  lat: number = 30.1064108;
  lng: number = 31.3172984;
  constructor(private mapsService: MapsService, private modalService: NgbModal) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => { this.lat = position.coords.latitude;  this.lng = position.coords.longitude; })
    }
    this.Read();
  }

  ngOnInit() {
    }

  distance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180
      var radlat2 = Math.PI * lat2/180
      var theta = lon1-lon2
      var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist
    }

  Read() {
    this.mapsService.Read().map(res => res.json()).subscribe( (res:any) => { this.locations = res.locations; });    
  }
  
  Send() {
    let location : Location = new Location();
    location.Name = this.Name;
    location.Latitude = this.lat;
    location.Longitude = this.lng;
    this.mapsService.Create(location).subscribe(
      p => { alert(p.json().message); this.Read(); this.close(); },
      e => { if(e.json().message != undefined) { alert(e.json().message); } else { alert("Error occurred."); } if(e.json().Exception != undefined) { console.log(e.json().Exception); }  },
      () => {  });
  }

  LocationModal : any;
  open(content) {
    this.Name = '';
    this.LocationModal = this.modalService.open(content);
    this.LocationModal.result.then((close) => { }, (dismiss) => { });
  }
  close() {
      this.LocationModal.close();
  }
}
