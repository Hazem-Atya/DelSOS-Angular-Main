import {AfterContentInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Delivery } from 'app/delsos/model/delivery';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'storeProfile-modal-component',
  templateUrl: './modal.component.html',
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

  .delivery-applicant-modal .card-wrapper{
    display:flex;
    flex-wrap: wrap;
    gap: 2%;
  }

  .delivery-applicant-modal .card {
    width: 48%;
  }
`]
})
export class StoreProfileModalComponent implements AfterContentInit {

    closeResult: string;

    @Input() delivery
    @Input() type :string
    trackingtable = []
    applicantsTable = []
    constructor(
        private modalService: NgbModal,
        private modalTrackingService: ModalService,
        private toastr: ToastrService,
        private router: Router
    ) {}


    async ngAfterContentInit() {
        if(this.trackingtable.length == 0){
            this.trackingtable = this.modalTrackingService.createDeliveryHistoryTable(this.delivery.trackingHistory)
        }
        if (this.delivery.shopper != null ) {
          
          await this.modalTrackingService.getShopper(this.delivery.shopper).subscribe(
            shopper => {
              this.delivery.shopper = shopper
            },
            error => {
              this.toastr.error("something went wrong !! contact your admin")
            }
          )
        }
        else if(this.delivery.applicants.length != 0){
          const applicants = this.delivery.applicants
          for( let i in applicants){
            await this.modalTrackingService.getShopper(applicants[i]).subscribe(
              shopper => {
                this.applicantsTable.push(shopper)
              },
              error => {
                this.toastr.error("something went wrong !! contact your admin")
              }
            )
          }
        }       
    }
        
    prepareData () {
        this.trackingtable = this.modalTrackingService.createDeliveryHistoryTable(this.delivery.trackingHistory)
    }

    openTrackSection(index){        
        this.trackingtable[index].isOpen = !this.trackingtable[index].isOpen
    }

    open(content) {
        this.modalService.open(content,{size:'xl',windowClass: this.type == "TRACK" ? 'delivery-tracking-modal' : 'delivery-applicant-modal'}).result.then((result) => {
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

    async chooseApplicant(shopperEmail){
      console.log("here");
      
        await this.modalTrackingService.chooseShopper(this.delivery._id,shopperEmail).subscribe(
          object => {
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
            });
            this.modalService.dismissAll(ModalDismissReasons.ESC)
          },
          error =>{
            this.toastr.error("something went wrong !! contact your admin")
          }
        )
    }
}
