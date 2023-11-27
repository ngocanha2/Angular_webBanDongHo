import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import{CartService} from '../cart.service'
import{Router} from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  @Input() quantityItem!: number;
  isDisplay= false;

  constructor(private cartService: CartService, private router: Router){}

  setDisplay(){
    if(this.quantityItem ==0)
    {
      this.isDisplay = false;
    } else
    {
      this.isDisplay = true;
    }
  }
  ngOnInit(): void {
     this.setDisplay();
    //  console.log("init cart")
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setDisplay();
    // console.log("change cart")
  }

  showCart(){
    this.router.navigate(['/giohang']);
  }
}
