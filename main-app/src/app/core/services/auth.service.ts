import { Injectable, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ApiResponse, LoginPayload, RegisterPayload, User } from '../model/common.model';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);

  constructor(private _http: HttpClient,private router:Router) {
    if(this.getToken()){
      this.isLoggedIn.update(()=>true);
    }
   }

  register(payload:RegisterPayload){
    return this._http.post<ApiResponse<User>>(`${ApiEndpoint.Auth.Register}`,payload);
  }

  login(payload:LoginPayload){
    return this._http.post<ApiResponse<User>>(`${ApiEndpoint.Auth.Login}`,payload)
    .pipe(map((response)=>{
      if(response.status && response.token){
        localStorage.setItem(LocalStorage.token,response.token);
        this.isLoggedIn.update(()=>true);
      }
      return response
    }));
  } 

  me(){
    return this._http.get<ApiResponse<User>>(`${ApiEndpoint.Auth.Me}`);
  }

  getToken(){
    return localStorage.getItem(LocalStorage.token);
  }

  logout(){
    localStorage.removeItem(LocalStorage.token);
    this.isLoggedIn.update(()=>false);
    this.router.navigate(['signin']);
  }
}
