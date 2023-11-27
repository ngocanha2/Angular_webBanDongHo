import { Component, EventEmitter, importProvidersFrom , OnInit, Output} from '@angular/core';
import{IUser} from '../iuser';
import{ServiceUserService} from '../service-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit{
  user!: IUser;
  // @Output()  userTran : EventEmitter<IUser> = new EventEmitter();
  emailLogin: string = "";
  passLogin: string="";
  lastUser!:any;

  userSignUp: IUser={
    tenDangNhap:"",
    matKhau: "",
    email:"",
    hoTen:"",
    sdt: "",
    id:0
  }

  ngOnInit(): void {
    this.UserService.getlastUser().subscribe(res => this.lastUser= res);
  }
  constructor(private UserService: ServiceUserService, private route: ActivatedRoute, private router: Router){}

  submitDangNhap(email: string, pass: string) {
    this.UserService.getUserByEmailPass(email, pass).subscribe(res => {
         
      if(Object.keys(res).length > 0){
        alert('Đăng nhập thành công')
        this.user = res;
        // this.userTran.emit(this.user);
        let urlNavigate = '/home'
        if(res[0].tenDangNhap == "admin"){
          //console.log('admin')
          urlNavigate = '/admin';
        }
        this.router.navigate([urlNavigate])
        //xử lý truyền dữ liệu sang app-root
        this.UserService.setUserData(this.user);
      }else{
        alert('Đăng nhập thất bại')
      }
    });
  }

  //Đăng kí
  clickDangKy(){

    this.UserService.getAutoID().then(id => {
      this.userSignUp.id = id;
      console.log("sign up",this.userSignUp)
      this.UserService.addUser(this.userSignUp);
    })
   this.router.navigate(['/dangnhap']);
   }

  onBlurDangNhap(){
    
  }
}
