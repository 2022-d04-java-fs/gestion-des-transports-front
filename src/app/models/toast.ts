import { TemplateRef } from '@angular/core';

export interface Toast {
  classname: string;
  textOrTpl: TemplateRef<any>;
}
