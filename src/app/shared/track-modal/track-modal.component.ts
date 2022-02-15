import { AfterContentInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'app/delsos/store-profile/modal/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { TrackModalService } from './services/track-modal.service';

@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.component.html',
  styleUrls: ['./track-modal.component.css'],
  encapsulation: ViewEncapsulation.None, 
  styles:[`
  .delivery-tracking-modal .delivery-tracking-info-section-header{
        display:flex;
        justify-content: space-between;
        margin-top: 2vh;
        margin-bottom: 2vh;
  }
  .delivery-tracking-modal .delivery-tracking-info-section-body{
    display: flex;
    flex-direction: row;
    gap: 2%;
  }
  .delivery-tracking-modal .delivery-tracking-info-section-body > div{
    display: flex;
    flex-direction: row;
    gap: 1%;  
    flex-wrap: wrap;
  }
  .delivery-tracking-modal #accordion {
    margin-top:2vh
  }

  .delivery-tracking-modal td {
    text-align: center;
    vertical-align: middle;
  }

  .delivery-tracking-modal th {
    text-align: center;
  }
  

  .delivery-tracking-modal .number-wrapper {
    background: lightgray;
    margin-top: 1vh;
    margin-bottom : 1vh;
    font-weight:bolder;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .delivery-tracking-modal .delivery-tracking-info-section-footer{
    display:flex;
    margin-top:2vh;
    gap: 1pc;
  }
  .delivery-tracking-modal .error-footer-text{
    color:red;
  }
  .delivery-tracking-modal .card-header button {
    width: 100%;
  } 
  `]
})
export class TrackModalComponent implements OnInit,AfterContentInit {

  closeResult: string;

  @Input() delivery
  @Input() buttonOption = false;
  @Input() type :string
  @Input() isShopper = false;

  trackingtable = []
  description = "";
  location = "";
  

  constructor(
    private modalService: NgbModal,
    private DeliveryTrackingService: TrackModalService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {
    if(typeof this.delivery == 'string')
      this.DeliveryTrackingService.getDelivery(this.delivery).subscribe(
        delivery =>{
          this.delivery = delivery
          console.log(delivery);
          
        },
        error => {
          this.toastr.error("something went wrong !! contact your admin")
        }
      )
  }

  
  async ngAfterContentInit() {
      if(this.trackingtable.length == 0){
        this.trackingtable = this.DeliveryTrackingService.createDeliveryHistoryTable(this.delivery.trackingHistory)
      }  

      if (this.delivery.shopper != null && typeof this.delivery.shopper == "string" ) {
          
        await this.DeliveryTrackingService.getShopper(this.delivery.shopper).subscribe(
          shopper => {
            this.delivery.shopper = shopper
          },
          error => {
            this.toastr.error("something went wrong !! contact your admin")
          }
        )
      }
  } 

  openTrackSection(index){        
    this.trackingtable[index].isOpen = !this.trackingtable[index].isOpen
  }

  open(content) {
    this.modalService.open(content,{size:'xl',windowClass: 'delivery-tracking-modal'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  async updateTrack(){
    console.log("yeyyyyyyy");
    
    if(this.description != "" && this.location != ""){
      var track={
        description : this.description,
        location : this.location,
        date: new Date(),
      }
      await this.DeliveryTrackingService.sendCurrentPosition({deliveryId: this.delivery._id,tracking: track}).subscribe(
        (delivery) =>{
          this.delivery.trackingHistory.push(delivery.trackingHistory[delivery.trackingHistory.length-1])
        },
        (error)=>{
          this.toastr.error("something went wrong!")
        }
      )
    }
    
  }

}
