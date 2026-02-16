import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu-bar',
  imports: [MenubarModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MenuBar {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: 'home',
      replaceUrl: false,
      styleClass: 'menu-link'
    },
    {
      label: 'Favorites',
      icon: 'pi pi-heart',
      routerLink: 'favorites',
      replaceUrl: false,
      styleClass: 'menu-link'
    },
  ]
}
