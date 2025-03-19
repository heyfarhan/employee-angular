import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styles: `
  header{
    background-color:#012;
    color:white;
    font-weight:500;
    font-family:sans-serif;
    padding:2vh 5vw;
    font-size:2rem;
    display:flex;
    justify-content:space-between;
  }
  .btn-add-emp{
    font-size:1.2rem;
  }
  .logo{
    cursor:pointer;
  }
  `

})
export class HeaderComponent {

  constructor(private router: Router) { }

  add() {
    this.router.navigate(['add'])
  }

}
