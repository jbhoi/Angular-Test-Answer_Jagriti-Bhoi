import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductData, ProductData } from 'src/assets/model/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  isSaving: boolean = false;
  addNewProduct = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(100)]],
    description: [null, [Validators.required]],
    type: [null, [Validators.required]],
    price: [null, [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.isSaving = false;
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('res', params, JSON.parse(params.editData));

      this.updateForm(JSON.parse(params.editData));
    });
  }

  save() {
    console.log('save clicked');
    this.isSaving = true;
    const productData = this.createForm();
    if (productData.id !== undefined && productData.id !== null) {
      console.log('create a new product');
      this.subscribeToSaveResponse(this.service.updateProduct(productData));
    } else {
      console.log('edit a product');
      this.subscribeToSaveResponse(this.service.addProduct(productData));
    }
  }

  updateForm(productData: IProductData) {
    this.addNewProduct.patchValue({
      id: productData.id,
      name: productData.name,
      type: productData.type,
      description: productData.description,
      price: productData.price,
    });
  }

  createForm(): IProductData {
    return {
      ...new ProductData(),
      id: this.addNewProduct.get(['id'])?.value,
      name: this.addNewProduct.get(['name'])?.value,
      type: this.addNewProduct.get(['type'])?.value,
      description: this.addNewProduct.get(['description'])?.value,
      price: this.addNewProduct.get(['price'])?.value,
    };
  }

  cancel() {
    window.history.back();
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IProductData>>
  ) {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  previousState() {
    window.history.back();
  }
}
