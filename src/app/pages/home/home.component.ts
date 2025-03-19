import { Component } from '@angular/core';
import { EmpListComponent } from "../../components/emp-list/emp-list.component";

@Component({
  selector: 'app-home',
  imports: [EmpListComponent],
  templateUrl: './home.component.html',
  styles: `
.home{
  display:flex;
  gap:5vh;
  flex-direction:column;
}
  `
})
export class HomeComponent {

  constructor() { }

}
