import { Component,OnInit } from '@angular/core';
import{ISanpham} from '../isanpham';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sanphammoi',
  templateUrl: './sanphammoi.component.html',
  styleUrls: ['./sanphammoi.component.css']
})
export class SanphammoiComponent implements OnInit {

  constructor(private service: ServiceDetailproductService, private route: ActivatedRoute){}
  listNewProducts: ISanpham[]=[];
  ngOnInit(): void {
    this.service.getNewProduct().subscribe(product => this.listNewProducts = product)
  }

}
