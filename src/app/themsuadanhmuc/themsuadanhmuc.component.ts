import { ChangeDetectorRef, Component, OnInit, NgZone } from '@angular/core';
import{ILoaiSanPham} from '../iloai-san-pham';
import{ILoaiSanPhamCon} from '../iloai-san-pham-con';
import{ServiceDetailproductService} from '../service-detailproduct.service'
import { ActivatedRoute } from '@angular/router';
import { ThanhtoanComponent } from '../thanhtoan/thanhtoan.component';

@Component({
  selector: 'app-themsuadanhmuc',
  templateUrl: './themsuadanhmuc.component.html',
  styleUrls: ['./themsuadanhmuc.component.css']
})

export class ThemsuadanhmucComponent implements OnInit{
  flag!: boolean;
  id:number =0;
  catogery!:ILoaiSanPham;
  listSubCategory:ILoaiSanPhamCon[]=[];
  listSubOriginal: ILoaiSanPhamCon[] = [];
  
  constructor(private service:ServiceDetailproductService, private route: ActivatedRoute, private cd: ChangeDetectorRef,  private zone: NgZone){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(pmap =>{
      if(pmap.has('id')){
        const gt = pmap.get('id')
        if(gt!= null && gt!== undefined)
          this.id = +gt;
       // console.log(this.id)
        this.flag = false;

        //load data
        this.service.getCategoryProductById(this.id).subscribe(res=>{
          this.catogery = res[0]; 
          this.service.getListSubCategoryByIDCategory(this.id).subscribe(res=> {
            this.listSubCategory = res;
            this.listSubOriginal=JSON.parse(JSON.stringify(res));
          })
        }) 
      } else{
        this.catogery = {
          id:0,
          tenLoai:""
        }
        this.flag= true;
      }
    })
  }

  loadData(){
    this.service.getCategoryProductById(this.id).subscribe(res=>{
      this.catogery = res;
     
    })

    this.service.getListSubCategoryByIDCategory(this.id).subscribe(res=> {
      this.listSubCategory = res;
     
    })
  }

  addInputSub(){
   
    let tmp:ILoaiSanPhamCon = {
      id:0,
      tenLoaiCon:"",
      idLoaiCha : this.id
      }
      this.listSubCategory.push(tmp)
    }

    deleteInput(vt: number){
      this.listSubCategory.splice(vt, 1);
    }
    
    OnClickSubmit(){
      if(this.flag){
        this.addNewCategory()
      }else if(this.flag== false){
        //sửa thông tin
        //so sánh với mảng ban đầu
        this.listSubCategory.forEach((curr)=>{
          console.log("-------------------------------")
          let ischeck = false;
          this.listSubOriginal.forEach((org)=>{
            if(org.id == curr.id){
              ischeck = true
              if(org.tenLoaiCon != curr.tenLoaiCon){
                //cập nhập lại tên
                this.service.updateSubCategory(curr);
                console.log("cập nhật")
              }else{

                console.log("bỏ qua")
              }
            }
          })

          if(!ischeck){
            this.service.addNewSubCatogery(curr);
            console.log("thêm tên sub")
          }
        })

        //xóa loại con

        console.log("orr", this.listSubOriginal)
        console.log("cur",this.listSubCategory)
       this.listSubOriginal.forEach((old)=>{
        if(this.listSubCategory.filter(c=> c.tenLoaiCon == old.tenLoaiCon).length ==0){
          this.service.deleteSubCategoryByID(old.id)
        }
       })
      }
    }

    addNewCategory(){
      this.service.addNewCatogery(this.catogery);

      this.getListSubCategory();
      
      setTimeout(() =>{
        let listTmp = this.listSubCategory.filter(item => item.tenLoaiCon.trim()!="")
        listTmp.forEach(item=> {
          this.service.addNewSubCatogery(item)
        })
      },1000)
    }

    //---------------------
    getListSubCategory(){
      this.listSubCategory=[];
      let listElement = document.querySelectorAll(".subcatergory")
      console.log(listElement)
      listElement.forEach((item)=>{
       let a= item as HTMLInputElement
       if(a){
        let subtmp: ILoaiSanPhamCon =  {
          id:0,
          idLoaiCha: this.id,
          tenLoaiCon: a.value
        }
        this.listSubCategory.push(subtmp)
      }
    })

  }

  changeValueSub(event: any,vt: number){
    
    this.listSubCategory[vt].tenLoaiCon = event.target.value   
  }
}
