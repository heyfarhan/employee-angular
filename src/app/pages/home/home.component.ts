import { Component } from '@angular/core';
import { EmpListComponent } from "../../components/emp-list/emp-list.component";
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [EmpListComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styles: `
  .home{
    margin:5vh 10vw;
    display:flex;
    flex-direction:column;
  }
  button{
    width:250px;
    margin:2vh 10vw;

  }
  .heading{
    font-size:2rem;
    margin:2vh 10vw 0;
  }
  `
})
export class HomeComponent {

  constructor(private router: Router) { }

  add() {
    this.router.navigate(['add'])
  }


}
