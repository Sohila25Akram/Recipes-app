import { afterNextRender, ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { SearchComponent } from './pages/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule} from '@angular/material/sidenav'
import { AuthService } from './services/auth.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, MatSidenavModule, RouterOutlet, RouterLink, RouterLinkActive, ScrollingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
   private authService = inject(AuthService);
  
   constructor(){ 
   
     
        afterNextRender(() => {
        this.authService.autoLogin()  
    
    })
  }
 

  title = 'recipes';

  links = [
    {
      path: '/',
      title: 'home'
    },
     {
      path: '/categories',
      title: 'categories'
    },
     {
      path: '/search',
      title: 'search'
    },
  ]

  isDrawerOpen: boolean = false;

 

  handleToggleDrawer () {
    this.isDrawerOpen = !this.isDrawerOpen
  }
}
