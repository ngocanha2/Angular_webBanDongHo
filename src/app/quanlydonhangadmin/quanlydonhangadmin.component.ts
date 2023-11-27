import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{IOrder} from '../iorder';
import{IDetailOrder} from '../idetail-order';
import{IUser} from '../iuser';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import{ServiceUserService} from '../service-user.service';
import{ServiceOrderService} from '../service-order.service';
import { ISanpham } from '../isanpham';
import{ServiceConfirmDialogService} from '../service-confirm-dialog.service'

@Component({
  selector: 'app-quanlydonhangadmin',
  templateUrl: './quanlydonhangadmin.component.html',
  styleUrls: ['./quanlydonhangadmin.component.css']
})
export class QuanlydonhangadminComponent {
  user!: IUser;
  listOrder:IOrder[]=[];
  listOrderAll:IOrder[]=[];
  flag:number = 5;
  listDetailOrder:IDetailOrder[][] = [];
  listProduct: ISanpham[] = [];  

  listOptions = ["Hủy","Chờ xác nhận", "Đang xử lý", "Đang giao", "Đã giao",  "Tất cả"];

  constructor(private serviceOrder: ServiceOrderService, private serviceUser: ServiceUserService, private serviceProduct: ServiceDetailproductService,
   private formModal: ServiceConfirmDialogService, private router: Router, private route: ActivatedRoute)
    {
      this.serviceUser.userData$.subscribe(data=> {
        let tmp: any = data;
        this.user = tmp[0]; 
      })
      this.serviceProduct.getAllProduct().subscribe(res=>{
        this.listProduct = res;
      })
      this.flag = 5;
      this.loadData()
  }

  loadData(){
    this.listDetailOrder=[];
    setTimeout(()=>{
      this.serviceOrder.getListOrderSortDesc().subscribe(res=> {
        this.listOrder = res;
        this.listOrderAll = JSON.parse(JSON.stringify(res));
      })
    },500)

    setTimeout(()=>{
      this.listOrderAll.forEach((item, index) => {
        this.serviceOrder.getDetailOrder(item.id).subscribe(res=>{
          this.listDetailOrder.push(res);
        })
      })
    },1000)
  }

  loadDataByStatus(){
    this.listDetailOrder=[];
      this.listOrder.forEach((item, index) => {
        this.serviceOrder.getDetailOrder(item.id).subscribe(res=>{
          this.listDetailOrder.push(res);
        })
      })
  }


  getInfoproduct(idsp: number):ISanpham{
    return this.listProduct.filter(sp => sp.id ==idsp)[0];
  }

  //click change
  changeOption(event: any, option: number){
    this.flag = option;
    if(this.flag != 5){
      this.listOrder = this.listOrderAll.filter(ord =>ord.trangThai == this.flag)
      this.loadDataByStatus();
    }
    else{
      this.loadData();
    }

    var listElement = document.querySelectorAll('.tab-item')
    listElement.forEach(element =>{
      element.classList.remove('active')
    })
    event.target.classList.add('active')
  }

  //xác nhận hàng loạt
  ConfirmAllOrder(){
   this.formModal.openConfirmDialog("Xác nhận", "Xác nhận hàng loạt?").then(
    rs=>{
      if(rs == true){
        this.listOrder.forEach(item => {
          item.trangThai = 2;
          this.serviceOrder.updateStatus(item)
          this.loadData();
          this.loadDataByStatus()
        })
      }
      else{

      }
   })
  }

  confirmStatus( order:IOrder){
    this.formModal.openConfirmDialog("xác nhận", "Xác nhận trạng thái mới").then(
      rs=>{
        if(rs==true){
          order.trangThai+=1;
          this.serviceOrder.updateStatus(order)
        }
      }
    )
  }

  CancelOrder( order:IOrder){
    this.formModal.openConfirmDialog("xác nhận", "Xác nhận trạng thái mới").then(
      rs=>{
        if(rs==true){
          order.trangThai=0;
          this.serviceOrder.updateStatus(order)
        }
      }
    )
  }

}
