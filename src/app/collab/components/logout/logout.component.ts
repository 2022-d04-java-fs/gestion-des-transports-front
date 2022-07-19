import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  public user?: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {}

  handleClick() {
    localStorage.removeItem('user');
    // this.router.navigateByUrl('/auth');
    this.showSuccess();
  }

  showSuccess() {
    this.toastService.show('Vous avez bien été déconnecté', {
      classname: 'bg-success text-light',
      delay: 4000,
      autohide: true,
    });
  }
}
