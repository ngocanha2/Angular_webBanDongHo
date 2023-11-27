import { Component } from '@angular/core';
import{IUser} from '../iuser'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  User!: IUser;
}
