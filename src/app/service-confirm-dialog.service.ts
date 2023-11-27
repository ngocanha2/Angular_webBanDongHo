import { Injectable } from '@angular/core';
import{NgbModal} from '@ng-bootstrap/ng-bootstrap';
import{ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class ServiceConfirmDialogService {

  constructor(private modalService: NgbModal) { }

  openConfirmDialog(title: string, message: string):Promise<boolean>{
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }
}
