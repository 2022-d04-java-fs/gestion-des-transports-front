import { userCredentials, User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


const URL: string = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  userDetails!: User;

  /**WIP
   *
   * Fonction qui envoit au back les infos de connexion d'un user
   * Si OK, le back renvoit l'Id, le nom, le prénom et le role
   * @param user
   * @returns
   */
  login(user:userCredentials){
    console.log(user)
    return this.http.post<User>(URL+"/auth/", user)
    .pipe(tap(userBack=>localStorage.setItem("user",JSON.stringify(userBack))))

  }

  getUser(){
    const user = localStorage.getItem("user");
    if(user){
      return JSON.parse(user);
    }
  }

  getUserId(){
    const user = this.getUser();
    if(user){
      return user.user_id;
    }
  }

}
