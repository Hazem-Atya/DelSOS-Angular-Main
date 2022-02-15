import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ReviewService} from './services/review.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'review-modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']

})
export class ModalReview implements OnInit {

    reviews;
    loading = false;
    rate = 0;
    closeResult: string;

    constructor(private modalService: NgbModal, private reviewService: ReviewService, private tostr: ToastrService) {
    }

    ngOnInit() {

    }

    open(content, type, modalDimension) {
        this.loading = true

        this.reviewService.getAll().subscribe(
            (reviews) => {
                this.reviews = reviews;
                this.loading = false;
               // this.reviewService.getUserData()
            },
            (error) => {
                this.tostr.error(error);
                this.loading = false;
            }
        );

        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, {windowClass: 'modal-mini modal-primary', size: 'sm'}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension === undefined && type === 'Login') {
            this.modalService.open(content, {windowClass: 'modal-login modal-primary'}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
