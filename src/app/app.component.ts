import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styles: `.outlet{
    display:flex;
    justify-content:center;
    align-items:center;
    padding:5vh 0;
    width:100vw;
    height:75vh;
  }`,
})
export class AppComponent {
  title = 'project-emp';
}
