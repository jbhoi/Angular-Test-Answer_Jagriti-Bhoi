import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productData: any;
  originalData: any;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  closeResult = '';

  constructor(private service: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.service.getProductData().subscribe((data) => {
      this.productData = data;
      this.originalData = data;
      this.collectionSize = data.length;
      console.log(data);
      this.refreshCountries();
    });
  }

  refreshCountries() {
    this.productData = this.originalData
      .map((product: any, i: any) => ({ id: i + 1, ...product }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  viewProduct(addData: any) {
    this.router.navigate(['view'], {
      queryParams: {
        viewData: JSON.stringify(addData),
      },
    });
  }

  editProduct(data: any) {
    this.router.navigate(['add'], {
      queryParams: {
        editData: JSON.stringify(data),
      },
    });
  }

  addProduct() {
    this.router.navigate(['add']);
  }

  deleteProduct(data: any) {
    this.router.navigate(['delete'], {
      queryParams: {
        deleteData: JSON.stringify(data),
      },
    });
  }
}
