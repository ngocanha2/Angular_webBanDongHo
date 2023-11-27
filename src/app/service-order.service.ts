import { Injectable } from '@angular/core';
import{IDetailOrder} from './idetail-order';
import{IOrder} from './iorder';
import{HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {

  constructor(private http: HttpClient) {   }

  getOrderById(id: number){
    let url = `http://localhost:3000/hoadon/${id}`;
    return this.http.get<IOrder>(url);
  }

  getListOrder(){
    let url='http://localhost:3000/hoadon';
    return this.http.get<IOrder[]>(url);
  }

  getListOrderSortDesc(){
    let url='http://localhost:3000/hoadon?_sort=id&_order=desc';
    return this.http.get<IOrder[]>(url);
  }


  getDetailOrder(id: number){
    let url=`http://localhost:3000/chitiethoadon?idhd=${id}`;
    return this.http.get<IDetailOrder[]>(url);
  }

  addOrder(hd: IOrder, listDetails: IDetailOrder[]){
   let urlhd='http://localhost:3000/hoadon';
   let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  this.http.post(urlhd, hd ,httpOptions).subscribe(
    reponse => {
      console.log("Thêm hd thành công")
    },
    error=>{
      console.log("Thêm hd thất bại")
    }
  )
  this.addListDetailsOrder(listDetails)

  }

  // addOneDetail(detail: IDetailOrder){
  //   let urlhd='http://localhost:3000/chitiethoadon';
  //  let httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  // this.http.post(urlhd, detail ,httpOptions).subscribe(
  //   reponse => {
  //     console.log("Thêm cthd thành công")
  //   },
  //   error=>{
  //     console.log("Thêm cthd thất bại: ", error)
  //   }
  // )
  // }

  addListDetailsOrder(listDetails: IDetailOrder[]){
    let urlcthd='http://localhost:3000/chitiethoadon';
    
    listDetails.forEach(item => {
      let httpOptionsDetail = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      this.http.post(urlcthd, item, httpOptionsDetail).subscribe( reponse => {
        console.log("Thêm cthd thành công")
      },
      error=>{
        console.log("Thêm cthd thất bại")
      })
    })
  }

  getNewOrder(){
    let url = `http://localhost:3000/hoadon?_sort=id&_order=desc&_limit=1`
    return this.http.get<any>(url);
  }

  getNewID(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getNewOrder().subscribe(res => {
        if (res.length !== 0) {
          resolve(res[0].id+1);
        } else {
          resolve(1);
        }
      });
    });
  }

  getListOrderByUser(idUser: number){
    let url=`http://localhost:3000/hoadon?userId=${idUser}&_sort=id&_order=desc`;
    return this.http.get<IOrder[]>(url);
  }

  getListProductByStatus(status: number){
    let url=`http://localhost:3000/hoadon?trangThai=${status}&_sort=id&_order=desc`;
    return this.http.get<IOrder[]>(url);
  }

  updateStatus(order: IOrder){
    let url = `http://localhost:3000/hoadon/${order.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
    .then(reponse => {
      if(reponse.status==200){
       alert("Cập nhật thành công")
      }else{
       alert("Cập nhật thất bại")
      }
    })
    .catch(err=> {
     // alert("lỗi kết nối")
    })
  }

}
