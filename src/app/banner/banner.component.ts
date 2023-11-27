import { Component, OnInit} from '@angular/core';
import{ILoaiSanPham} from '../iloai-san-pham';
import{ServiceDetailproductService} from '../service-detailproduct.service';
import{ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{
  listNameCategory: ILoaiSanPham[] = [];
  constructor(private service: ServiceDetailproductService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.service.getListCategoryProduct().subscribe(
      res =>{
        this.listNameCategory = res;
    })
  }

  spTheoloai(idCategory: number){
    this.router.navigate(['/loai',idCategory]);
  }
}