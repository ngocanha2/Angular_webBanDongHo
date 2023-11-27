import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DanhsachsanphamComponent } from './danhsachsanpham/danhsachsanpham.component';
import { ChitietsanphamComponent } from './chitietsanpham/chitietsanpham.component';
import { HomeComponent } from './home/home.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { GiohangComponent } from './giohang/giohang.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SanphambanchayComponent } from './sanphambanchay/sanphambanchay.component';
import { SanphammoiComponent } from './sanphammoi/sanphammoi.component';
import { SanphamtheoloaiComponent } from './sanphamtheoloai/sanphamtheoloai.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { SanphamlienquanComponent } from './sanphamlienquan/sanphamlienquan.component';
import { CartComponent } from './cart/cart.component';
import { BannerComponent } from './banner/banner.component';
import { SanphamtheoloaiconComponent } from './sanphamtheoloaicon/sanphamtheoloaicon.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import{NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ChitietdonhangComponent } from './chitietdonhang/chitietdonhang.component';
import { TrangcanhanComponent } from './trangcanhan/trangcanhan.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { MenubaradminComponent } from './menubaradmin/menubaradmin.component';
import { QuanlySanPhamComponent } from './quanly-san-pham/quanly-san-pham.component';
import { ThemsuasanphamComponent } from './themsuasanpham/themsuasanpham.component';
import { QuanlydanhmucComponent } from './quanlydanhmuc/quanlydanhmuc.component';
import { ThemsuadanhmucComponent } from './themsuadanhmuc/themsuadanhmuc.component';
import { QuanlydonhangComponent } from './quanlydonhang/quanlydonhang.component';
import { QuanlydonhangadminComponent } from './quanlydonhangadmin/quanlydonhangadmin.component';
import { ChitietdonhangadminComponent } from './chitietdonhangadmin/chitietdonhangadmin.component';
import { TimkiemComponent } from './timkiem/timkiem.component'

@NgModule({
  declarations: [
    AppComponent,
    DanhsachsanphamComponent,
    ChitietsanphamComponent,
    HomeComponent,
    DangkyComponent,
    DangnhapComponent,
    NotfoundComponent,
    LienheComponent,
    GiohangComponent,
    SanphambanchayComponent,
    SanphammoiComponent,
    SanphamtheoloaiComponent,
    SanphamlienquanComponent,
    CartComponent,
    BannerComponent,
    SanphamtheoloaiconComponent,
    ThanhtoanComponent,
    ConfirmDialogComponent,
    ChitietdonhangComponent,
    TrangcanhanComponent,
    AdminpageComponent,
    MenubaradminComponent,
    QuanlySanPhamComponent,
    ThemsuasanphamComponent,
    QuanlydanhmucComponent,
    ThemsuadanhmucComponent,
    QuanlydonhangComponent,
    QuanlydonhangadminComponent,
    ChitietdonhangadminComponent,
    TimkiemComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
