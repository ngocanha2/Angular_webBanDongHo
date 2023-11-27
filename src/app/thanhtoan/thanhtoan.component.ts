import { Component, Input , OnInit} from '@angular/core';
import { ICart } from '../icart';
import{ServiceUserService} from '../service-user.service';
import{CartService} from '../cart.service'
import { ActivatedRoute, Router } from '@angular/router';
import{ServiceConfirmDialogService} from '../service-confirm-dialog.service'
import{ IUser } from '../iuser';
import{IDetailOrder} from '../idetail-order';
import{IOrder} from '../iorder';
import{ServiceOrderService} from '../service-order.service'

@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent implements OnInit {
listItemCart!: ICart[];
user!:IUser;
sumCost: number=0;
isDisplay: boolean = true;
idNewOrder!: number;

soNha: string="";
quan: string="";
tinh: string="";
tenNguoiNhan: string="";
email: string="";
sdt: string="";

constructor(private serviceCart: CartService, private serviceUser: ServiceUserService, private serviceOrder: ServiceOrderService,
  private router: Router, private route: ActivatedRoute,private formModal: ServiceConfirmDialogService ){
    this.serviceCart.getListItemsCart().subscribe(item =>{
      this.listItemCart = item;
    })

    this.serviceUser.userData$.subscribe(data=> {
      let tmp: any = data;
      this.user = tmp[0];
      this.tenNguoiNhan = this.user.hoTen;
      this.sdt = this.user.sdt;
      this.email = this.user.email;
    })
    this.sumCost = this.listItemCart.reduce((sum, curr) => sum + (curr.giasp * curr.soluong),0)
    
  }

  ngOnInit(): void {
  }
  order(){
    //thêm đơn hàng mới
    let orderTmp: IOrder = {
      id: 0,
      diachi: this.soNha + ", " + this.quan + ", "+ this.tinh,
      tenNguoiNhannHang: this.tenNguoiNhan,
      tongTien: this.sumCost,
      sdt: this.sdt,
      userId: this.user.id,
      trangThai: 1
    }


    this.serviceOrder.getNewID().then(i=>{
      orderTmp.id = i

      let listDetailsOrderTmp: IDetailOrder[]=[];

      this.listItemCart.forEach(item => {
        let tmp: IDetailOrder = {
          id: 0,
          idhd: orderTmp.id,
          idsp: item.idsp,
          donGia: item.giasp,
          soLuong: item.soluong,
          thanhTien: item.giasp * item.soluong
        }
       listDetailsOrderTmp.push(tmp);
    })
    this.serviceOrder.addOrder(orderTmp, listDetailsOrderTmp)
    //xóa giỏ hàng
    this.serviceCart.setCartdata([])

    setTimeout(()=>{
      this.idNewOrder = i
      this.isDisplay = false;
    }, 1000)
    
    })
   
  }

  openConfrirmOrder(){
    this.formModal.openConfirmDialog('Xác nhận', 'Xác nhận đặt đơn hàng này?').then(
      rs=> {
        if(rs == true)
        {
          this.order();
        } else{
         
        }
      }
    )
  }

  onBlur(event: Event){
    let element = event.target;
    //if(element.classList.contains)
  }

}
