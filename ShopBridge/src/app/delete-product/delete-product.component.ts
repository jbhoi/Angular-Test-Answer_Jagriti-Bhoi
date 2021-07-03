import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent implements OnInit {
  @Input() name: any;
  product: any;
  constructor(
    public activeModal: NgbActiveModal,
    private service: ProductService,
    protected activatedRoute: ActivatedRoute,
    public modalService: NgbModal,
    protected router: Router
  ) {}

  ngOnInit(): void {
    
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.service.deleteProduct(id).subscribe((response) => {
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-delete-product-popup',
  template: '',
})
export class DeleteProductPopupComponent implements OnInit {
  protected ngbModalRef: NgbModalRef;
  constructor(
    protected activatedRoute: ActivatedRoute,
    public modalService: NgbModal,
    protected router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(
          DeleteProductComponent as Component,
          { size: 'lg', backdrop: 'static' }
        );
        this.ngbModalRef.componentInstance.product = JSON.parse(
          params.deleteData
        );
        this.ngbModalRef.result.then(
          (result) => {
            this.router.navigate(['product', { outlets: { popup: null } }]);
          },
          (reason) => {
            this.router.navigate(['product', { outlets: { popup: null } }]);
          }
        );
      }, 0);
    });
  }

  
  open() {
    const modalRef = this.modalService.open(DeleteProductComponent);
    modalRef.componentInstance.name = 'World';
  }
}
