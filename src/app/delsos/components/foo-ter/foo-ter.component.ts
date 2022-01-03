import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo-ter',
  templateUrl: './foo-ter.component.html',
  styleUrls: ['./foo-ter.component.css']
})
export class FooTerComponent implements OnInit {
  data : Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
