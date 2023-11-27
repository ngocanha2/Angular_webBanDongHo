import { Injectable } from '@angular/core';
import {IUser} from './iuser'
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  userData = new BehaviorSubject({});
  userData$ = this.userData.asObservable();

  constructor(private http: HttpClient) { }

  setUserData(user: IUser){
    this.userData.next(user);
  }

  getUserData(){
    return this.userData.getValue();
  }
  getUserById(id: number){
    return this.http.get<any>(`http://localhost:3000/user?id=${id}`)
  }

  getUserByEmailPass(email: string, pass: string){
    let url = `http://localhost:3000/user?email=${email}&matKhau=${pass}`;
    return this.http.get<any>(url)
  }
  getUserByEmail(email: string){
    let url = `http://localhost:3000/user?email=${email}`;
    return this.http.get<IUser>(url)
  }

  addUser(user: IUser){
    let url = `http://localhost:3000/user` 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post(url, user, httpOptions).subscribe(
      response => {
        alert("Thêm thành công")
      },
      error => {
        alert("Thêm thất bại")
      }
    );
  }

  

  getlastUser(){
    let url = 'http://localhost:3000/user?_sort=id&_order=desc&_limit=1';
    return this.http.get<any>(url)
  }

  getAutoID(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getlastUser().subscribe(res => {
        if (res.length !== 0) {
          resolve(res[0].id + 1);
        } else {
          resolve(1);
        }
      });
    });
  }

}

