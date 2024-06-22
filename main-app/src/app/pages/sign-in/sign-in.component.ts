import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  form:FormGroup;
  authService = inject(AuthService)

  constructor(private fb:FormBuilder,private router:Router){
    this.form = this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
  }

  onSubmit(){
    if(this.form.valid){
      this.authService.login(this.form.value).subscribe({
        next:(response)=>{
          this.router.navigate(['']);
        },
      });
    }
  }
}
