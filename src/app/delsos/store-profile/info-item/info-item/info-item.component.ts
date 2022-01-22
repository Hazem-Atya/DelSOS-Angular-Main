import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.css']
})
export class InfoItemComponent implements OnInit {

  @Input() fieldname : string;

  @Input() data : string;

  @Input() position : number
  
  constructor() { }

  ngOnInit(): void {
  }

}
