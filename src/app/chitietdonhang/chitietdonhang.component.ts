import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import{ServiceOrderService} from '../service-order.service';
import{IOrder} from '../iorder';
import{IDetailOrder} from '../idetail-order';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import{ISanpham} from '../isanpham'
import { ActivatedRoute } from '@angular/router';
import{ServiceConfirmDialogService} from '../service-confirm-dialog.service'

@Component({
  selector: 'app-chitietdonhang',
  templateUrl: './chitietdonhang.component.html',
  styleUrls: ['./chitietdonhang.component.css']
})
export class ChitietdonhangComponent implements OnInit, OnChanges {
  @Input() idOrder!: number
  order !:IOrder;
  listDetailsOrder!:IDetailOrder[];
  listProduct!:ISanpham[];
  listStatus!: string[] ;

  constructor(private serviceOrder: ServiceOrderService, private serviceProduct: ServiceDetailproductService,
    private formModal:ServiceConfirmDialogService ,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.listStatus = ["Đã hủy", "Chờ xác nhận","Đang xử lý", "Đang giao", "Đã giao"]
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

    this.serviceOrder.getDetailOrder(this.idOrder).subscribe(res =>
        {
          this.listDetailsOrder = res

        }
         )

    setTimeout(()=>{
      
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

     // console.log(this.listProduct)
  }

  cancelOrder(){
    this.formModal.openConfirmDialog('Xác nhận', 'Xác nhận đặt đơn hàng này?').then(
      rs=> {
        if(rs == true)
        {
          this.order.trangThai = 0;
          this.serviceOrder.updateStatus(this.order);
        } else{
          
        }
      }
    )
  }

}
