import { Injectable } from '@angular/core';
import{ISanpham} from '../app/isanpham';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoaiSanPham } from './iloai-san-pham';
import{ILoaiSanPhamCon} from './iloai-san-pham-con';
import{IDetailOrder} from './idetail-order'
import { throttleTime } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ServiceDetailproductService {

  constructor(private http: HttpClient) { }

  getAllProduct(){
    return this.http.get<ISanpham[]>('http://localhost:3000/sanpham');
  }

  searchProduct(key: string){
    return this.http.get<ISanpham[]>(`http://localhost:3000/sanpham/?tensp_like=${key}`)
  }
  getListProductPagination(pageNum: number =1, pageSize: number=1){
    return this.http.get<any>(`http://localhost:3000/sanpham?_page=${pageNum}&_limit=${pageSize}`, {observe:'response'});
  }

  getProductByID(id: number){
    return this.http.get<ISanpham>(`http://localhost:3000/sanpham/${id}`);
  }

  getLaptopBestSaler(){
    var url='http://localhost:3000/sanpham?idLoai=2&_sort=solanxem&_order=desc&_limit=6';
    return this.http.get<ISanpham[]>(url);
  }

  getNewProduct(){
    var url ='http://localhost:3000/sanpham?_sort=ngay&_order=desc&_limit=6';
    return this.http.get<ISanpham[]>(url);
  }

  //phân trang sp theo loại
  getListProductsByCategoryPagination(idLoai: Number=0, pageSize: number=1, pageNum: number=1){
    // var url = `http://localhost:3000/sanpham?idLoai=${idLoai}&_sort=ngay&_order=desc`;
    // url+= `&_page=${pageNum}&_limit=${pageSize}`;
    var url = `http://localhost:3000/sanpham?idLoai=${idLoai}&_sort=ngay&_order=desc&_page=${pageNum}&_limit=${pageSize}`;
   return this.http.get<any>(url, {observe:'response'});
  }

  getNameCategories(idLoai: Number=0){
    var url = `http://localhost:3000/loaisp?id=${idLoai}`;
    return this.http.get<ILoaiSanPham[]>(url);
  }

  getListCategoryProduct(){
    return this.http.get<ILoaiSanPham[]> ('http://localhost:3000/loaisp');
  }
  getCategoryProductById(id: number){
   // return this.http.get<ILoaiSanPham> (`http://localhost:3000/loaisp?id=${id}`);
    return this.http.get<any> (`http://localhost:3000/loaisp?id=${id}`);
  }

  getListSubCategoryProduct(){
    return this.http.get<ILoaiSanPhamCon[]>('http://localhost:3000/loaispcon');
  }

  //sản phẩm liên quan
  getRelatedProduct(idLoai: number, idSp: number){
    // var url = `http://localhost:3000/sanpham?idLoai=${idLoai}&id_ne=${idSp}&_limit=4`;
    var url =`http://localhost:3000/sanpham?idLoai=${idLoai}&id_ne=${idSp}&_limit=4`
    return this.http.get<ISanpham[]>(url);
  }

  //lấy các loại con của 1 loại cha
  getListSubCategoryByIDCategory(idLoaiCha:number){
    var url =`http://localhost:3000/loaispcon?idLoaiCha=${idLoaiCha}`;
    return this.http.get<ILoaiSanPhamCon[]>(url);
  }

  //lấy sp theo id loại con
  getListProductBySubCatogryID(idLoaiCon:number){
    var url =`http://localhost:3000/sanpham?idLoaiCon=${idLoaiCon}`;
    return this.http.get<ISanpham[]>(url);
  }

  DeleteproductById(idsp: number){
    var url=`http://localhost:3000/chitiethoadon?idsp=${idsp}`;
    let rs = 0;
    this.http.get<IDetailOrder[]>(url).subscribe(data =>{
      if(data.length > 0){
        alert("Sản phẩm này không thể xóa")
        rs = 0;
      }else{
        //delete
        this.deleleteproduct(idsp).subscribe(() => {
          alert("Xóa sản phẩm thành công")
          rs =1;
        }, 
        (Error)=>{
          alert("Đã xảy ra lỗi khi xóa sản phẩm")
          rs =-1;
        })
      }
    });
  }

  private deleleteproduct(idsp: number){
    var url=`http://localhost:3000/sanpham/${idsp}`
   return this.http.delete(url) 
  }

  addNewProduct(newProduct: ISanpham){
    let url = 'http://localhost:3000/sanpham';
    const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        this.http.post(url, newProduct, httpOptions).subscribe(
          response => {
            alert("Thêm Thành công")
          },
          error =>{
            alert("Thêm thất bại");
          }
          
        )
  }

  updateProduct(product: ISanpham){
    let url = `http://localhost:3000/sanpham/${product.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
    .then(reponse => {
      if(reponse.status==200){
        alert("Cập nhật thành công")
      }else{
        alert("Cập nhật thất bại")
      }
    })
    .catch(err=> {
      alert("lối kết nối")
    })
  }

  addNewCatogery(newCategory: ILoaiSanPham){
    let url = `http://localhost:3000/loaisp`;
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post(url, newCategory, httpOptions).subscribe(
      response => {
        alert("Thêm Thành công")
      },
      error =>{
        alert("Thêm thất bại");
      }
      
    )
    
  }

  addNewSubCatogery(newSub: ILoaiSanPhamCon){
    //lấy id danh mục cha
    this.getNewCategory().subscribe(res=>{
      newSub.idLoaiCha = res[0].id;
      let url = `http://localhost:3000/loaispcon`;
      const httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
       };
       //console.log("ca: ", newSub)
       this.http.post(url, newSub, httpOptions).subscribe(
         response => {
          // alert("Thêm phân loại con thành công")
         },
         error =>{
          // alert("Thêm phân loại con thất bại");
         })

    })

   
  }

  getNewCategory(){
    let url = `http://localhost:3000/loaisp?_sort=id&_order=desc&_limit=1`
    return this.http.get<any>(url);
  }

  DeleteCategoryById(idca: number){
    
    var url=`http://localhost:3000/sanpham?idLoai=1${idca}`;
    this.http.get<ISanpham[]>(url).subscribe(data =>{
      if(data.length > 0){
        console.log("Loại sản phẩm này không thể xóa")
        alert("Loại sản phẩm này không thể xóa");
      }else{
        //console.log("vô", idca)
        //delete
        this.deleteCategory(idca).subscribe(() => {
          alert("Xóa loại sản phẩm thành công")
        }, 
        (Error)=>{
          alert("Đã xảy ra lỗi khi xóa loại sản phẩm")
        })
      }
    });
  }

  private deleteCategory(idca: number){
    var url=`http://localhost:3000/loaisp/${idca}`
    this.deleteSubCategory(idca);
   return this.http.delete(url);
  }

  private deleteSubCategory(idca: number){
   let listSub: ILoaiSanPhamCon[]= []; 
   this.getListSubCategoryByIDCategory(idca).subscribe(res => listSub = res);
     setTimeout(()=>{
      if(listSub.length>0){
        listSub.forEach(item => {
          return this.deleteSubCategoryByID(item.id);
        })
      }
     },1000)
  }

   deleteSubCategoryByID(idsub: number){
    let url = `http://localhost:3000/loaispcon/${idsub}`;
    return this.http.delete(url)
        .subscribe(
            response => {
                console.log('thành công', response);
            },
            error => {
                console.error('thất bại', error);
            }
        );
  }

  //sửa loại sản phẩm
  updateCategory(category: ILoaiSanPham){
    let url = `http://localhost:3000/loaisp/${category.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    })
    .then(reponse => {
      if(reponse.status==200){
        alert("Cập nhật thành công")
      }else{
        alert("Cập nhật thất bại")
      }
    })
    .catch(err=> {
      alert("Lỗi kết nối")
    })
  }

  updateSubCategory(sub: ILoaiSanPhamCon){
    let url = `http://localhost:3000/loaispcon/${sub.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sub)
    })
    .then(reponse => {
      if(reponse.status==200){
        alert("Cập nhật thành công")
      }else{
        alert("Cập nhật thất bại")
      }
    })
    .catch(err=> {
      alert("Lỗi kết nối")
    })
  }
 
}
