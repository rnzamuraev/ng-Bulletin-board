// import { ComponentRef } from '@angular/core'
export interface IContext {
  header?: string;
  classes?: string[];
}

export interface IDialogRef {
  component: any;
  // component: ComponentRef<AuthComponent>;
  isOpen: boolean;
  header?: string;
  classes?: string[];
  open?: () => void;
  close?: () => void;
}
