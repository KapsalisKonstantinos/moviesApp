import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Footer } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuBar } from "./components/menu-bar/menu-bar.component";
import {ToastModule} from "primeng/toast"
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, HeaderComponent, MenuBar, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'moviesCollection';
}
