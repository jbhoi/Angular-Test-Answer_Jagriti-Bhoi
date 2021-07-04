import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IProductData, ProductData } from 'src/assets/model/product.model';

type EntityResponseType = HttpResponse<IProductData>;
type EntityArrayResponseType = HttpResponse<IProductData[]>;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public apiUrl = 'http://localhost:5555/products';
  productData: any;

  constructor(private http: HttpClient) {}

  public getProductData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap((data) => {
        this.productData = data;
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public addProduct(productData: IProductData): Observable<EntityResponseType> {
    return this.http
      .post<IProductData>(this.apiUrl, productData, {
        observe: 'response',
      })
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  public updateProduct(product: IProductData): Observable<any> {
    return this.http
      .put<IProductData>(this.apiUrl + `/${product.id}`, product, {
        observe: 'response',
      })
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http
      .delete<IProductData>(this.apiUrl + `/${id}`, {
        observe: 'response',
      })
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
}
