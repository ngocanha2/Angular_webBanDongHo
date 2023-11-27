import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import{ServiceOrderService} from '../service-order.service';
import{IOrder} from '../iorder';
import{IUser} from '../iuser';
import{ServiceUserService} from '../service-user.service'
import{IDetailOrder} from '../idetail-order';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import{ISanpham} from '../isanpham'
import { ActivatedRoute } from '@angular/router';
import{ServiceConfirmDialogService} from '../service-confirm-dialog.service'

@Component({
  selector: 'app-chitietdonhangadmin',
  templateUrl: './chitietdonhangadmin.component.html',
  styleUrls: ['./chitietdonhangadmin.component.css']
})
export class ChitietdonhangadminComponent {
  @Input() idOrder!: number
  order !:IOrder;
  listDetailsOrder!:IDetailOrder[];
  listProduct!:ISanpham[];
  listStatus!: string[] ;
  userOrder!: IUser;
   color:string[] = ['#ccc', '#ffc107','#0dcaf0 ','#0dcaf0 ','#0dcaf0']

  constructor(private serviceOrder: ServiceOrderService, private serviceProduct: ServiceDetailproductService,
   private serviceUser: ServiceUserService, private formModal:ServiceConfirmDialogService ,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.listStatus = ["Đã hủy", "Chờ xác nhận","Đang xử lý", "Đang giao", "Đã giao"];

    this.route.paramMap.subscribe(pmap =>{
      if(pmap.has('id')){
        const gt = pmap.get('id')
        if(gt!= null && gt!== undefined)
          this.idOrder = +gt;
        } 
    })
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  loadData(){
    this.listProduct=[];
    this.serviceOrder.getOrderById(this.idOrder).subscribe(res =>
      this.order = res)

    
    this.serviceOrder.getDetailOrder(this.idOrder).subscribe(res =>{
          this.listDetailsOrder = res
        })
   
    setTimeout(()=>{  
      this.serviceUser.getUserById(this.order.userId).subscribe(res=>{
        this.userOrder = res[0]
        console.log(res)
      });
  
    this.listDetailsOrder.forEach(item => {
      this.loadInfoProduct(item.idsp)
    })
    }, 1000)
  }

  loadInfoProduct(idsp: number){
    this.serviceProduct.getProductByID(idsp).subscribe(res =>
      {
       let product: ISanpham = res
       this.listProduct.push(product)
      })
  }

  CancelOrder(){
    this.formModal.openConfirmDialog('Xác nhận', 'Hủy đơn hàng này?').then(
      rs=> {
        if(rs == true)
        {
          this.order.trangThai = 0;
          this.serviceOrder.updateStatus(this.order);
        }
      })
  }

  ConfirmOrder(){
    this.formModal.openConfirmDialog('Xác nhận', 'Xác nhận đơn hàng').then(
      rs=> {
        if(rs == true)
        {
          this.order.trangThai = 2;
          this.serviceOrder.updateStatus(this.order);
        }
      })
  }

  changeStatusOrder(){
    let question = "Chuyển đơn hàng sang trạng thái ";
    if(this.order.trangThai == 2){
      question += '"Đang giao ?"'
    }else if(this.order.trangThai ==3)
    {
      question += '"Đã giao ?"'
    }

    this.formModal.openConfirmDialog('Xác nhận', question).then(
      rs=> {
        if(rs == true)
        {
          this.order.trangThai +=1;
          this.serviceOrder.updateStatus(this.order);
        }
      })
  }
}
