import { Router } from '@angular/router';
import { User } from './../../../../classes/user';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const URL_COLLAB: string = '/collaborateur/reservations'; // URL par défaut une fois connecté en tant que collaborateur
const URL_CHAUFFEUR: string = '/collaborateur/reservations'; // à modifier
const URL_ADMIN: string = '/collaborateur/reservations'; // à modifier

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  formDataAuth: FormGroup;

  public user!: User;

  authError: boolean = false;

  @ViewChild('contentAdmin')
  public adminRef!: TemplateRef<any>;

  @ViewChild('contentDriver')
  public driverRef!: TemplateRef<any>;

  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router, private modalSrv: NgbModal) {
    this.formDataAuth = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
  }

  /**
   * Vérifie les infos rentrées par l'utilisateur pour l'envoyer sur la page correspondant à son role
   *
   * Fonctionne qu'avec des données factices pour l'instant
   * @param data
   */
  checkAuth(data: any) {

    this.user.email = data.email;
    this.user.password = data.password;

        if (this.authSrv.login(this.user) == 1) {
          this.router.navigateByUrl(URL_COLLAB)
        } else if (this.authSrv.login(this.user) == 2) {
          this.modalSrv.open(this.driverRef);
        } else if (this.authSrv.login(this.user) == 3) {
          this.modalSrv.open(this.adminRef);
        } else {
          this.authError = true;
        }
  }

  goToCollab() {
    this.modalSrv.dismissAll();
    this.router.navigateByUrl(URL_COLLAB);
  }

  goToDriver() {
    this.modalSrv.dismissAll();
    this.router.navigateByUrl(URL_CHAUFFEUR);
  }

  goToAdmin() {
    this.modalSrv.dismissAll();
    this.router.navigateByUrl(URL_ADMIN);
  }


}
