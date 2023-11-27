import { Component, OnInit } from '@angular/core';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import{ISanpham} from '../isanpham';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sanphambanchay',
  templateUrl: './sanphambanchay.component.html',
  styleUrls: ['./sanphambanchay.component.css']
})
export class SanphambanchayComponent implements OnInit {
  constructor(private service: ServiceDetailproductService, private route: ActivatedRoute){

  }
  // listProduct: ISanpham[]=[];
  listProduct: any;
ngOnInit(): void {
  this.service.getLaptopBestSaler().subscribe(res=> this.listProduct = res)
}
}
