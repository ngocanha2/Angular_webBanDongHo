import { Component, OnInit } from '@angular/core';
import{ISanpham} from '../isanpham';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';


@Component({
  selector: 'app-timkiem',
  templateUrl: './timkiem.component.html',
  styleUrls: ['./timkiem.component.css']
})
export class TimkiemComponent {
  listProduct: ISanpham[]=[];
  keywords: string="";

    constructor(private service: ServiceDetailproductService, private route: Router, private router : ActivatedRoute){
    }
    ngOnInit(): void {
      this.route.events.subscribe((event)=>{
        if (event instanceof NavigationEnd) {
          this.loadData()
        }
      })
      this.loadData()
    }
    
    loadData(){
      this.keywords = String(this.router.snapshot.params['keyword']).toLocaleLowerCase();
      this.service.searchProduct(this.keywords).subscribe(data =>{
        this.listProduct = data;
      })
    }
  
}
  

