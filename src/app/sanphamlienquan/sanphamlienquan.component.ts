import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import{ ActivatedRoute, Router } from '@angular/router';
import{ ISanpham } from '../isanpham';


@Component({
  selector: 'app-sanphamlienquan',
  templateUrl: './sanphamlienquan.component.html',
  styleUrls: ['./sanphamlienquan.component.css']
})
export class SanphamlienquanComponent implements OnInit, OnChanges {
  @Input() idLoai!: number;
  @Input() idSP!: number;
  listSanPhamLienQuan: ISanpham[] = [];

  constructor(private service: ServiceDetailproductService, private activatedRoute: ActivatedRoute, private roter: Router){}

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.service.getRelatedProduct(this.idLoai, this.idSP).subscribe(
      res=>{
        this.listSanPhamLienQuan = res;
      }
    )
  }
  // //ngăn chặn hành vi mặc định trên thẻ a
  // navigateToproductDetails(productID: number){
  //   //lấy tham số router hiện tại
  //   const currentID = this.activatedRoute.snapshot.params['id'];
  //   this.roter.navigate(['/sanpham',productID],{ queryParams: { reload: true } })
  // }
}
