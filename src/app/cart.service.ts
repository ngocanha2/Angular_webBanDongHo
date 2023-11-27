import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{ICart} from './icart';
import{ ISanpham } from './isanpham';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  playholder:any=[];
  listItemsCart = new BehaviorSubject([]);

  constructor(http: HttpClient) {
    let ls = this.getCartData();
    if(ls){ 
      this.listItemsCart.next(ls);  
    }
    }

  addItem(product: ISanpham){
    let ls = this.getCartData();
    let exist!:ICart;
    if(ls)
      exist = ls.find((item: any)=> {
        return item.idsp == product.id
      })

    if(exist){
      exist.soluong++;
      this.setCartdata(ls)
      console.log("exits",exist);
    }else
    {
      let newItem: ICart;
      newItem ={
      idsp: product.id,
      tensp: product.tensp,
      giasp: product.giasp, 
      hinh: product.hinh[0],
      soluong: 1
      }      
      this.playholder.push(newItem);
      this.setCartdata(this.playholder);
     // this.listItemsCart.next(this.playholder);
    }
  }

  getListItemsCart(){
    return this.listItemsCart;
  }

  deleteAll(){
    localStorage.removeItem('cart')
    alert("delete")
  }

  setCartdata(data: any){
    localStorage.setItem('cart',JSON.stringify(data) as string)
    this.listItemsCart.next(this.getCartData());
  }

  getCartData(){
    return JSON.parse(localStorage.getItem('cart') as string)
  }
 }
