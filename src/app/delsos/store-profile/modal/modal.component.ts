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
    applicantsTable = []
    constructor(
        private modalService: NgbModal,
        private DeliveryModalService: ModalService,
        private toastr: ToastrService,
        private router: Router
    ) {}


    async ngAfterContentInit() {
        if (this.delivery.shopper != null && typeof this.delivery.shopper == "string" ) {
          
          await this.DeliveryModalService.getShopper(this.delivery.shopper).subscribe(
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
            await this.DeliveryModalService.getShopper(applicants[i]).subscribe(
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
        
    open(content) {
        this.modalService.open(content,{size:'xl',windowClass:'delivery-applicant-modal'}).result.then((result) => {
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
      
        await this.DeliveryModalService.chooseShopper(this.delivery._id,shopperEmail).subscribe(
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
