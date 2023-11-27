import { Component, OnInit } from '@angular/core';
import{ServiceDetailproductService} from '../service-detailproduct.service'
import{ISanpham} from '../isanpham'
import { Router } from '@angular/router';

@Component({
  selector: 'app-quanly-san-pham',
  templateUrl: './quanly-san-pham.component.html',
  styleUrls: ['./quanly-san-pham.component.css']
})
export class QuanlySanPhamComponent implements OnInit {
  listProduct!: ISanpham[];
  constructor(private serviceproduct: ServiceDetailproductService, private router: Router){}
  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    this.serviceproduct.getAllProduct().subscribe(res => this.listProduct = res)
  }

  deleteProductById(item: any){
  
    this.serviceproduct.DeleteproductById(item.id);
    
    setTimeout(()=>{
      window.location.reload();
    },1000)
      //this.listProduct.splice(this.listProduct.indexOf(item))
  }

  updateproductById(id: any){
    this.router.navigate(['admin/quanlysanpham/update/', id])
  }
  insertProduct(){
    this.router.navigate(['admin/quanlysanpham/insert'])
  }
}
