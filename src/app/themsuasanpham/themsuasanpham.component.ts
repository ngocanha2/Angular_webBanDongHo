import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import{ServiceDetailproductService} from '../service-detailproduct.service'
import{ISanpham} from '../isanpham';
import{ILoaiSanPham} from '../iloai-san-pham';
import{ILoaiSanPhamCon} from '../iloai-san-pham-con';
import { RootBoundary } from '@popperjs/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-themsuasanpham',
  templateUrl: './themsuasanpham.component.html',
  styleUrls: ['./themsuasanpham.component.css']
})
export class ThemsuasanphamComponent implements OnInit {
  flag!: boolean;
  idsp: number=0;
  product!:ISanpham;
  listCategorie: ILoaiSanPham[] = []
  listSubCategorie: ILoaiSanPhamCon[] = []


  @ViewChild('frm_Insert') frmInsert!: ElementRef;
  //listCatogery:

  constructor(private serviceProduct: ServiceDetailproductService, private router: Router, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(pmap=>{
      if(pmap.has('id')){
        const gt = pmap.get('id')
        if(gt != null && gt != undefined)
          this.idsp = +gt;
        this.flag = false;

        this.serviceProduct.getProductByID(this.idsp).subscribe(res=>{ 
          this.product = res
         // console.log("up ",this.product);

          this.loaddata();
        })
      } else{
        this.product={
          id:0,
          tensp: "",
          solanxem:0,
          soluong:0,
          giasp:0,
          idLoai:1,
          idLoaiCon:0,
          hinh:[],
          mota:""
        };
        this.flag = true;
        this.loaddata();
      }
    })
 
  }

  loaddata(){
    this.serviceProduct.getListCategoryProduct().subscribe(res=>  this.listCategorie = res)
    this.serviceProduct.getListSubCategoryByIDCategory(this.product.idLoai).subscribe(res => {
      this.listSubCategorie = res
    })
  }

  onChangeCategory(event: any){
    this.serviceProduct.getListSubCategoryByIDCategory(event.target.value).subscribe(res => this.listSubCategorie = res)
  }
  validate(){
    this.frmInsert.nativeElement.classList.add('was-validated')
    //kiểm tra validate
    if(this.flag){
       this.addNewProduct();
    }else if(this.flag== false){
      // console.log("sp up",this.product)
      this.serviceProduct.updateProduct(this.product)
    }
  

  }
  changeQuantity(event: any){
    let numberNow = event.target.value as number;
    if(numberNow <= 0){
      event.target.value = 0
      return;
    } 
  }

  addNewProduct(){
    this.serviceProduct.addNewProduct(this.product);
  }

  OnChangeImage(event: any){
    this.product.hinh = [];
    console.log("file", event.target.files )
    let selectedFiles = event.target.files;
    for(let i =0; i< selectedFiles.length; i++){
     this.product.hinh.push(selectedFiles[i].name);
    }
  }
}