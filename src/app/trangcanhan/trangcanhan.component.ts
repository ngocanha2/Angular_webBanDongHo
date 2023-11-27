import { Component } from '@angular/core';
import{ServiceUserService} from '../service-user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../iuser';

@Component({
  selector: 'app-trangcanhan',
  templateUrl: './trangcanhan.component.html',
  styleUrls: ['./trangcanhan.component.css']
})
export class TrangcanhanComponent {
  user!:IUser;
  constructor(private serviceUser: ServiceUserService, private router: Router){
    this.serviceUser.userData$.subscribe(res => {
      let tmp: any = res;
      this.user = tmp[0]; 
    })
  }

  redirectManageOrder(){
    this.router.navigate(['/quanlydonhang'])
  }

}
