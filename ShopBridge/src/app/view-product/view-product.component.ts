import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductData, ProductData } from 'src/assets/model/product.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  products: any;
  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.products = JSON.parse(params.viewData);
    });
  }

  editProduct() {
    this.router.navigate(['add'], {
      queryParams: {
        editData: JSON.stringify(this.products),
      },
    });
  }

  previousState() {
    window.history.back();
  }
}
