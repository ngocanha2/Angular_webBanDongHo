import { Component, OnInit, OnChanges } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';
import{ServiceDetailproductService} from './service-detailproduct.service';
import{ILoaiSanPham} from './iloai-san-pham';
import{CartService} from './cart.service';
import{ServiceUserService} from './service-user.service';
import{ServiceConfirmDialogService} from './service-confirm-dialog.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'webBanHang';
  keySearch:string="";
  listCategoryName: ILoaiSanPham[] =[];

  quantityIteminCart !:number;
  user: any = {
    id: 0, 
      tenDangNhap:"",
      matKhau:"",
      sdt:"",
      hoTen:"",
      email:""
  };
  name: string="";
  

  constructor(private service: ServiceDetailproductService, private route: ActivatedRoute, private roter: Router,
               private serviceCart: CartService, private userService: ServiceUserService, private serviceConfirm: ServiceConfirmDialogService){
                
                this.userService.userData$.subscribe(res=>{
                  this.user = res;
                  //console.log(res)
                  if(res!= undefined)
                    this.name = this.user[0].tenDangNhap;
                })  
  }
  
  ngOnInit(): void {
      this.service.getListCategoryProduct().subscribe(
      res =>{
        this.listCategoryName = res;
    })
    this.serviceCart.listItemsCart.subscribe((item: any)=>{
      this.quantityIteminCart = item.length;  
      
     this.userService.userData$.subscribe(data=> this.user = data)
    })
}

  ngOnChanges(): void{

  }
  
spTheoloai(id: number){
  this.roter.navigate(['/loai',id])
}
  // this.cartService.numOfItem.subscribe(d=>{
  //   this.quantityItem = d.length;
  //   console.log(d);

  handelDangXuat(){
   this.user= {};
   this.name="";
   this.userService.setUserData(
    { 
      id: 0, 
      tenDangNhap:"",
      matKhau:"",
      sdt:"",
      hoTen:"",
      email:""
    })}

  openLogoutConfimation(){
// console.log("a",this.name)
    if(this.name == ""){
      alert("Bạn chưa đăng nhập");
    }else{
      this.serviceConfirm.openConfirmDialog('Xác nhận', 'Bạn có chắc chắn muốn đăng xuất?')
      .then(rs=>{
        if(rs ==  true)
          this.handelDangXuat();
      })
    }
  }

  //tìm kiếm sản phẩm 
  
}
