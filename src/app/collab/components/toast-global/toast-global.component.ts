import { Component, OnInit, TemplateRef } from '@angular/core';
import { Toast } from 'src/app/models/toast';
import { ToastService } from 'src/app/services/toast.service';

/**
 * Toast global pour toute l'app
 *
 * @class ToastGlobalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-toast-global',
  templateUrl: './toast-global.component.html',
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastGlobalComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}

  isTemplate(toast: Toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  /**
   * Toutes les fonctions à utiliser pour utiliser les toasts
   * dans toute l'application !
   */

  // showStandard() {
  //   this.toastService.show('I am a standard toast', {
  //     delay: 2000,
  //     autohide: true,
  //   });
  // }

  // showSuccess() {
  //   this.toastService.show('I am a success toast', {
  //     classname: 'bg-success text-light',
  //     delay: 2000,
  //     autohide: true,
  //     headertext: 'Toast Header',
  //   });
  // }

  // showError() {
  //   this.toastService.show('I am a success toast', {
  //     classname: 'bg-danger text-light',
  //     delay: 2000,
  //     autohide: true,
  //     headertext: 'Error!!!',
  //   });
  // }

  // showCustomToast(customTpl: string | TemplateRef<any>) {
  //   this.toastService.show(customTpl, {
  //     classname: 'bg-info text-light',
  //     delay: 3000,
  //     autohide: true,
  //   });
  // }
}
