import { User, userCredentials } from './../../../../models/user';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const URL_COLLAB: string = '/collaborateur/reservations'; // URL par défaut une fois connecté en tant que collaborateur
const URL_DRIVER: string = '/collaborateur/reservations'; // à modifier
const URL_ADMIN: string = '/collaborateur/reservations'; // à modifier

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  formDataAuth: FormGroup;

  public user!: User;
  public userCredentials: userCredentials={email:'',password:''};

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
  }

  /**
   * Vérifie les infos rentrées par l'utilisateur pour l'envoyer sur la page correspondant à son role
   *
   * Fonctionne qu'avec des données factices pour l'instant
   * @param data
   */
  checkAuth() {

    this.userCredentials.email = this.formDataAuth.value.email;
    this.userCredentials.password = this.formDataAuth.value.password;
    console.log(this.userCredentials)
    this.authSrv.login(this.userCredentials).subscribe(user=>
      {//this.authError = false;
        this.user=user;
        if (user.roles.length == 1) {
          this.router.navigateByUrl(URL_COLLAB)
        } else if (user.roles.length == 2) {
          this.modalSrv.open(this.driverRef);
        } else if (user.roles.length == 3) {
          this.modalSrv.open(this.adminRef);
        }
      }, error => {this.authError = true;
      console.log('test')}
    )


  }

  goToCollab() {
    this.modalSrv.dismissAll();
    this.router.navigateByUrl(URL_COLLAB);
  }

  goToDriver() {
    this.modalSrv.dismissAll();
    this.router.navigateByUrl(URL_DRIVER);
  }

  goToAdmin() {
    this.modalSrv.dismissAll();
    this.router.navigateByUrl(URL_ADMIN);
  }


}
