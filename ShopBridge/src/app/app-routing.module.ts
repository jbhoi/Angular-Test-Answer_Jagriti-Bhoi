import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../app/product/product.component';
import { DeleteProductComponent, DeleteProductPopupComponent } from './delete-product/delete-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';


const routes: Routes = [
    { path: '', redirectTo:'product', pathMatch:"full", },  
    { path: 'product', component: ProductComponent },  
    { path: 'delete', component: DeleteProductPopupComponent},
    { path: 'add', component: AddProductComponent },
    { path: 'view', component: ViewProductComponent }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
