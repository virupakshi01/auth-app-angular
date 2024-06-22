import { Component, OnInit, effect,Injector, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  authService = inject(AuthService);
  injector = inject(Injector);
  isLoggedIn = false;

  ngOnInit(): void {
      effect(()=>{
        this.isLoggedIn = this.authService.isLoggedIn();
      },{injector:this.injector})
  }
}
