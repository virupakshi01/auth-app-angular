import { Component, inject } from '@angular/core';
import { User } from 'src/app/core/model/common.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  authService = inject(AuthService);
  user!:User;

  ngOnInit(){
    this.authService.me().subscribe({
      next:(response)=>{
        console.log(response);
        this.user = response.data;
      }
    })
  }

  logout(){
    this.authService.logout();
  }
}
