import { Component, OnInit } from '@angular/core';
import {ISanpham} from '../isanpham';
import{ILoaiSanPham} from '../iloai-san-pham';
import{ILoaiSanPhamCon} from '../iloai-san-pham-con';
import{ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import{ServiceDetailproductService} from '../service-detailproduct.service'

@Component({
  selector: 'app-sanphamtheoloai',
  templateUrl: './sanphamtheoloai.component.html',
  styleUrls: ['./sanphamtheoloai.component.css']
})
export class SanphamtheoloaiComponent implements OnInit {
  listProduct: ISanpham[]=[];
  listCategoryName: ILoaiSanPham[] =[];
  listSubCategory:ILoaiSanPhamCon[]=[];

  nameCategory: string ="";
  idCategory: number =0;
  pageNum: number = 1;
  pageSize: number = 6;
  total: number =0;
  constructor(private service: ServiceDetailproductService, private route: ActivatedRoute, private router: Router){ }

  private loadListProduct():void{
    this.service.getListProductsByCategoryPagination(this.idCategory,this.pageSize, this.pageNum).subscribe(
      res => {
        this.listProduct = res.body;
        this.total = Number(res.headers.get('X-Total-Count'));
        console.log("Total: ",this.total)
      }
    )
  }

  ngOnInit(): void {
    this.loadProduct();
    //handle url change
     this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        //handle reload page
        console.log('URL changed:', event.url);
        this.loadProduct();
      }
    })
  }

  loadProduct(): void{
     //get id from url 
     this.idCategory= Number(this.route.snapshot.params['id']);
     this.loadListProduct();
     //get name of Category
     this.service.getNameCategories(this.idCategory).subscribe(
       res=> {
         this.nameCategory= res[0].tenLoai;
       }
     )
     //get list Category
     this.service.getListCategoryProduct().subscribe(
       res =>{
         this.listCategoryName = res;
     })
     //get list sub Category
     this.service.getListSubCategoryByIDCategory(this.idCategory).subscribe(
       res =>{
         this.listSubCategory = res;
     })
  }
  //phân trang
  goToNextPage(p: number){
    this.pageNum = p;
   this.loadListProduct();   
  }

  loadSPBySubCategoryID(id: number, idLoai: number ){
    this.router.navigate(['/loaicon', id, idLoai])
  }

  loadSPByCategoryIdOrther(id: number){
    this.router.navigate(['/loai', id])
  }
}
