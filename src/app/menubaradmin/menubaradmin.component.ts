import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubaradmin',
  templateUrl: './menubaradmin.component.html',
  styleUrls: ['./menubaradmin.component.css']
})
export class MenubaradminComponent {
constructor(private router: Router){}
manageProduct(){
  this.router.navigate(['admin/quanlysanpham'])
}
manageCategoey(){
  this.router.navigate(['admin/quanlydanhmuc'])
}
manageOrder(){
  this.router.navigate(['admin/quanlydonhang'])
}
}
