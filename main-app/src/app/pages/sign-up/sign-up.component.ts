import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  form:FormGroup;

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){
    this.form = this.fb.group({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
  }

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
      
      this.authService.register(this.form.value).subscribe({
        next:(response)=>{
          this.router.navigate(['signin']);
        },
      });
    }
  }
}
