import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifComponent implements OnInit {





@Input()
public alert:IAlert;
private backup: Array<IAlert>;
opacity=1;
constructor() {
}
  ngOnInit(): void {
    setTimeout(()=>
        this.alert=null,5000)
    setInterval(
        ()=> {
      this.opacity-=0.015;
    },150)
  }
public closeAlert() {
  this.alert=null;
}
}

export interface IAlert {
//  id: number;
  type: string;  // success, info, warning, danger
  strong?: string;
  message: string;
  icon?: string;
}
