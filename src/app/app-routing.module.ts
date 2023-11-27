import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DanhsachsanphamComponent } from './danhsachsanpham/danhsachsanpham.component';
import { ChitietsanphamComponent } from './chitietsanpham/chitietsanpham.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { NotFoundError } from 'rxjs';
import{ SanphamtheoloaiComponent } from './sanphamtheoloai/sanphamtheoloai.component'
import { SanphamlienquanComponent } from './sanphamlienquan/sanphamlienquan.component';
import { GiohangComponent } from './giohang/giohang.component';
import{ SanphamtheoloaiconComponent } from './sanphamtheoloaicon/sanphamtheoloaicon.component'
import{ThanhtoanComponent} from './thanhtoan/thanhtoan.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { QuanlySanPhamComponent } from './quanly-san-pham/quanly-san-pham.component';
import { ThemsuasanphamComponent } from './themsuasanpham/themsuasanpham.component';
import { QuanlydanhmucComponent } from './quanlydanhmuc/quanlydanhmuc.component';
import { ThemsuadanhmucComponent } from './themsuadanhmuc/themsuadanhmuc.component';
import { QuanlydonhangComponent } from './quanlydonhang/quanlydonhang.component';
import { ChitietdonhangComponent } from './chitietdonhang/chitietdonhang.component';
import { TrangcanhanComponent } from './trangcanhan/trangcanhan.component';
import { QuanlydonhangadminComponent } from './quanlydonhangadmin/quanlydonhangadmin.component';
import { ChitietdonhangadminComponent } from './chitietdonhangadmin/chitietdonhangadmin.component';
import{TimkiemComponent} from './timkiem/timkiem.component'

const routes: Routes = [
  { path: '', component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'sanpham',component:DanhsachsanphamComponent},
  {path:'sanpham/:id', component: ChitietsanphamComponent},
  {path:'dangky',component:DangkyComponent},
  {path:'dangnhap',component:DangnhapComponent},
  {path:'lienhe',component:LienheComponent},
  {path: 'loai/:id', component:SanphamtheoloaiComponent},
  {path:'giohang', component: GiohangComponent},
  {path:'loaicon/:id/:idLoai', component: SanphamtheoloaiconComponent},
  {path:'thanhtoan', component: ThanhtoanComponent},
  {path:'admin', component: AdminpageComponent},
  {path:'admin/quanlysanpham', component: QuanlySanPhamComponent},
  {path:'admin/quanlysanpham/insert', component: ThemsuasanphamComponent},
  {path:'admin/quanlysanpham/update/:id', component: ThemsuasanphamComponent},
  {path:'admin/quanlydanhmuc', component: QuanlydanhmucComponent},
  {path:'admin/quanlydanhmuc/insert', component: ThemsuadanhmucComponent},
  {path:'admin/quanlydanhmuc/update/:id', component: ThemsuadanhmucComponent},
  {path:'admin/quanlydonhang', component: QuanlydonhangadminComponent},
  {path:'quanlydonhang', component: QuanlydonhangComponent},
  {path:'chitietdonhang/:id', component: ChitietdonhangComponent},
  {path:'admin/chitietdonhang/:id', component: ChitietdonhangadminComponent},
  {path: 'trangcanhan', component: TrangcanhanComponent},
  {path: 'timkiem/:keyword', component: TimkiemComponent},
  // {path: 'sanphamlienquan/:id', component: SanphamlienquanComponent},
  {path:'**',component:NotFoundError},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
