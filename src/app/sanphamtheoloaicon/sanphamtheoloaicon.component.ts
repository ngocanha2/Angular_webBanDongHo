import { Component, OnInit } from '@angular/core';
import{ILoaiSanPhamCon} from '../iloai-san-pham-con'
import{ILoaiSanPham} from '../iloai-san-pham'
import{ISanpham} from '../isanpham';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-sanphamtheoloaicon',
  templateUrl: './sanphamtheoloaicon.component.html',
  styleUrls: ['./sanphamtheoloaicon.component.css']
})
export class SanphamtheoloaiconComponent implements OnInit {
  listProduct: ISanpham[]=[];
  listCategoryName: ILoaiSanPham[] =[];
  listSubCategory:ILoaiSanPhamCon[]=[];

  idSubCategory: number =0;
  nameCategory: string="";
  idCategory!:number;
  pageNum: number = 1;
  pageSize: number = 6;
  total: number =0;
  constructor(private service: ServiceDetailproductService, private route: ActivatedRoute, private router: Router){ }

  private loadListProduct():void{
    // this.service.getListProductsByCategoryPagination(this.idSubCategory,this.pageSize, this.pageNum).subscribe(
    //   res => {
    //     this.listProduct = res.body;
    //     this.total = Number(res.headers.get('X-Total-Count'));
    //     console.log("Total: ",this.total)
    //   }
    // )
    //lấy ds sản phẩm
    this.service.getListProductBySubCatogryID(this.idSubCategory).subscribe(res=>{
      this.listProduct = res
    })
    
  }

  ngOnInit(): void {
    this.loadProduct();
    //handle url change
     this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        //handle reload page
        // console.log('URL changed:', event.url);
        this.loadProduct();
      }
    })
  }

  loadProduct(): void{
     //get id from url 
     this.idSubCategory= Number(this.route.snapshot.params['id']);
     this.idCategory = Number(this.route.snapshot.params['idLoai'])
     this.loadListProduct();
     
     //get list Category
     this.service.getListCategoryProduct().subscribe(
       res =>{
         this.listCategoryName = res;
     })
     //get list sub Category for category id
     this.service.getListSubCategoryByIDCategory(this.idCategory).subscribe(
       res =>{
         this.listSubCategory = res;
     })

     //get name of Category
     this.service.getNameCategories(this.idCategory).subscribe(
      res=> {
        this.nameCategory= res[0].tenLoai;
      }
    )
  }

  //phân trang
  goToNextPage(p: number){
    this.pageNum = p;
   this.loadListProduct();   
  }

  loadSPBySubCategoryID(id: number, idLoaiCha: number ){
    this.router.navigate(['/loaicon', id, idLoaiCha])
  }

  loadSPByCategoryIdOrther(id: number){
    this.router.navigate(['/loai', id])
  }
}
