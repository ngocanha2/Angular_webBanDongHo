import { Component, Input , OnInit} from '@angular/core';
import{ICart }from '../icart';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import{CartService} from '../cart.service';
import{ServiceUserService} from '../service-user.service';
import { IUser } from '../iuser';
import { Router } from '@angular/router';
import{ISanpham} from '../isanpham'

@Component({
  selector: 'app-giohang',
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css']
})
export class GiohangComponent implements OnInit {
  listItemscart: ICart[]=[];
  totalOneItem =0;
  sumCost : number =0;
  user: any = {
    id: 0,
    tenDangNhap: "",
    hoTen: "",
    matKhau:"",
    email: "",
    sdt:""
  };

  constructor(private serviceProduct:ServiceDetailproductService , private cartService: CartService, private cartProduct: ServiceDetailproductService, 
    private userService: ServiceUserService, private router: Router){
    this.userService.userData$.subscribe(data=> {
      if(data != undefined)
      {
        let userTemp: any = data
        this.user = userTemp[0];
      }
    })
    }
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(){
    this.cartService.getListItemsCart().subscribe(
      (d: any)=> {
        this.listItemscart = d;
        // console.log("list cart", d);
      }
    );
    this.sumCostCart();
  }

  changeTotalMoney(event: any, dg: number){
    let nowCount = event.target.value as number;
    this.totalOneItem = nowCount* dg;
  }

  validateForChangeEvent(event: any, i: number, idsp: number){
    let numberNow = event.target.value as number;
    this.serviceProduct.getProductByID(idsp).subscribe(res=> {
      let sl:number = res.soluong;
      if(numberNow <= 0 || numberNow > sl){
        event.target.value = this.listItemscart[i].soluong;
        return;
      }
     })
   
  }

  validateInput(event: any, i: number,idsp: number){
    this.validateForChangeEvent(event, i, idsp);
    let numberNow = event.target.value as number;
    //---------------------------------------------------------------
    this.serviceProduct.getProductByID(idsp).subscribe(res=> {
     let sl:number = res.soluong;
      if(numberNow != this.listItemscart[i].soluong && sl >= numberNow){
        this.updateQuantity(i, numberNow);
       
      }
     })
    
  }

  updateQuantity(index: number, numNow: number){
    this.listItemscart[index].soluong = numNow;
    //update to localstorage
    this.cartService.setCartdata(this.listItemscart);
    this.sumCostCart();
  }

  sumCostCart(){
    this.sumCost = this.listItemscart.reduce((sum, curr)=>sum + Number(curr.giasp)*Number(curr.soluong) , 0)
  }
  DeleteAll(){
    this.listItemscart=[];
    this.cartService.setCartdata(this.listItemscart);
    this.sumCost=0;
    alert("delete All successfully")
  }
  DeleteOne(i: number){
    this.listItemscart.splice(i,1);
    this.cartService.setCartdata(this.listItemscart);
    this.sumCostCart();
  }

  BuyProduct(){
    // console.log("đã vô")
   //kiểm tra đăng nhập
   if(this.user != undefined )
   {
      this.router.navigate(['/thanhtoan'])
   } else{
    this.router.navigate(['/dangnhap'])
   }
}
}
