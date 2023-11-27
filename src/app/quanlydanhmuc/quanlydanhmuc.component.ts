import { Component, OnInit } from '@angular/core';
import{ILoaiSanPham} from '../iloai-san-pham';
import { ILoaiSanPhamCon } from '../iloai-san-pham-con';
import{ServiceDetailproductService} from '../service-detailproduct.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-quanlydanhmuc',
  templateUrl: './quanlydanhmuc.component.html',
  styleUrls: ['./quanlydanhmuc.component.css']
})

export class QuanlydanhmucComponent implements OnInit {
  listCatogery: ILoaiSanPham[] = [];
  listSubCatogery: ILoaiSanPhamCon[] = [];
  constructor(private service: ServiceDetailproductService, private router: Router){}
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.getListCategoryProduct().subscribe(res => {
      this.listCatogery = res;    })

      this.service.getListSubCategoryProduct().subscribe(res=>{
        this.listSubCatogery = res
      })
  }

  getListSubCategoryByIdCatogery(id: number): ILoaiSanPhamCon[]{
   let list = this.listSubCatogery.filter(item => item.idLoaiCha == id)
   //console.log("id: ", list)
   return list;
  }

  onClickInsertCatory(){
    this.router.navigate(['admin/quanlydanhmuc/insert'])
  }

  //delete Category
  deleteCategoryById(item: any){
   this.service.DeleteCategoryById(item.id);
  }

  updateCategoryByID(item: any){
    this.router.navigate(['admin/quanlydanhmuc/update/',item.id])
  }
}
