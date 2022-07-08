import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../classes/role';
import { User } from '../classes/user';


//Data pour test
// à supprimer quand connexion avec le back
const COLLAB: User = {
  email: 'collab',
  password: 'collab',
  role: [Role.COLLAB]
}

const CHAUFFEUR: User = {
  email: 'chauffeur',
  password: 'chauffeur',
  role: [Role.COLLAB, Role.CHAUFFEUR]
}

const ADMIN: User = {
  email: 'admin',
  password: 'admin',
  role: [Role.COLLAB, Role.CHAUFFEUR, Role.ADMIN]
}

const URL: string = ''

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  /**
   *Fonction de connexion qui retourne la taille du tableau de role
   qui sert à déterminer où envoyer le user selon son role

   Fonctionne avec des données factices seulement déclarées en amont
   * @param user
   * @returns
   */
  login(user:User): number {
    if(user.email===COLLAB.email && user.password===COLLAB.password){
      return COLLAB.role.length
    } else if(user.email===CHAUFFEUR.email && user.password===CHAUFFEUR.password){
      return CHAUFFEUR.role.length
    } else if(user.email===ADMIN.email && user.password===ADMIN.password){
      return ADMIN.role.length
    } else {
      console.log("error")
      return 0
    }
  }

  /**WIP
   *
   * Fonction qui envoit au back les infos de connexion d'un user
   * Si OK, le back renvoit l'Id, le nom, le prénom et le role
   * @param user
   * @returns
   */
  login2(user:User){
    return this.http.post<any>(URL, {"email":user.email, "password":user.password})
  }

}
