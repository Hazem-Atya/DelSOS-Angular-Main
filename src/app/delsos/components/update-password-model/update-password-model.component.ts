import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from './custom-validator/confirmPwd-validator';
import { updatePwdService } from './services/update-pwd.service';


@Component({
    selector: 'app-update-password-model',
    templateUrl: './update-password-model.component.html',
    styleUrls: ['./update-password-model.component.css']
})
export class UpdatePasswordModelComponent implements OnInit {
    closeResult: string;
    updatePasswordForm: FormGroup;
    @Input() id: string;
    constructor(private toastr: ToastrService, private modalService: NgbModal,
        private formBuilder: FormBuilder, private updatePwdService: updatePwdService) { }

    ngOnInit(): void {
        this.updatePasswordForm = this.formBuilder.group({
            oldpassword: ['',
                Validators.required, Validators.minLength(8),],
            newpassword: ['',
                Validators.required, Validators.minLength(8),],
            confirmpassword: ['',
                [Validators.required
                ],
            ],
        }, {
            validator: ConfirmedValidator('newpassword', 'confirmpassword')
        })
    }


    get f() { return this.updatePasswordForm.controls; }

    open(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension == undefined && type === 'Login') {
            this.modalService.open(content, { windowClass: 'modal-login modal-primary' }).result.then((result) => {
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

    onSubmit(c) {
        console.log(this.updatePasswordForm.value)
        let password = {
            oldPassword: this.updatePasswordForm.value.oldpassword ,
            newPassword:  this.updatePasswordForm.value.newpassword
          
        }
        this.updatePwdService.updatePassword(password).subscribe(
            (response) => {
                console.log(response)
                this.toastr.success("Password updated successfully")
                c('Close click')
            },
            (error) => {
                console.log(error)
                this.toastr.error(error.error)
            }
        )
    }
}
