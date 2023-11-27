import { Component, OnInit, SimpleChanges } from '@angular/core';
import{} from '../iloai-san-pham'
import{ ISanpham } from '../isanpham'
import{ActivatedRoute, Router, NavigationEnd} from '@angular/router'
import{ServiceDetailproductService} from'../service-detailproduct.service'
import{CartService} from '../cart.service'
import{ICart} from '../icart'

@Component({
  selector: 'app-chitietsanpham',
  templateUrl: './chitietsanpham.component.html',
  styleUrls: ['./chitietsanpham.component.css']
})
export class ChitietsanphamComponent implements OnInit{
  constructor(private serviceProduct: ServiceDetailproductService,private serviceCart: CartService , private activatedRoute: ActivatedRoute, private router: Router){}
  cartItem=[];
  product!: ISanpham;
  id!:number;
  displayImg: number =0;
    ngOnInit(): void {
      //xử lý url thay đổi
      this.router.events.subscribe((event)=>{
        if (event instanceof NavigationEnd) {
          //xử lý load lại trang
         // console.log('URL changed:', event.url);
          this.loadProduct();
          this.displayImg= 0;
        }
      })
     this.loadProduct();
    }
    
    private loadProduct(){
      this.id = Number(this.activatedRoute.snapshot.params['id']);
      // console.log("id: ", this.id)
      this.serviceProduct.getProductByID( this.id).subscribe(
        res=> {
          this.product = res;
          //console.log(res);
        }
      )
    }
    
  //   myClick(event: any,hinh: string, vt:number){
  //     event.target.style.border = '1px solid rgba(255, 0, 0, 0.552)'
  //     event.target.style.opacity = '1'
  //     const parentElement = event.target.parentNode
  //     console.log(parentElement)
  //     for (let i = 0; i < parentElement.children.length; i++) {
  //       if(i != vt){
  //         parentElement.children[i].style.border = 'none';
  //         parentElement.children[i].style.opacity = '0.5';
  //       }
  //     }
  // }

  clickNext(event:any){ 

  }

  //handel add to cart
  listProduct: ISanpham[] = [];

 addToCart(product: ISanpham){
  this.serviceCart.addItem(product);
  alert('Thêm giỏ hàng thành công')
 }

 delete(){
  this.serviceCart.deleteAll();
 }
}