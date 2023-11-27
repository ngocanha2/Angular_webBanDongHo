import { Component, OnInit } from '@angular/core';
import{ HttpClient } from '@angular/common/http'
import{ISanpham} from '../isanpham';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-danhsachsanpham',
  templateUrl: './danhsachsanpham.component.html',
  styleUrls: ['./danhsachsanpham.component.css']
})
export class DanhsachsanphamComponent implements OnInit {
  listProduct: ISanpham[]=[];
  pageNum: number=1;
  pageSize: number = 9;
  total: number=0;

  constructor(private service: ServiceDetailproductService, private route : ActivatedRoute){ }
  ngOnInit(): void {
    this.service.getListProductPagination(this.pageNum, this.pageSize).subscribe(res=>{
      this.listProduct = res.body;
      this.total= Number(res.headers.get('X-Total-Count'))
    })
  }
  
  goToNextPage(p: number){
    this.pageNum = p;
    this.service.getListProductPagination(this.pageNum, this.pageSize).subscribe(res=>{
      this.listProduct = res.body;
      // this.total= this.listProduct.length;
    })
  }

}
