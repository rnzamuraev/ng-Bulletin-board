import { ComponentFactoryResolver, ComponentRef, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IContext, IDialogRef } from "src/app/layout/types/dialog.interface";
// import { AuthComponent } from "src/app/pages/auth/components/auth/auth.component";

@Injectable()
export class DialogService {
  private _dialogRef!: IDialogRef;
  private _dialogRef$ = new Subject<IDialogRef>();

  constructor() {}

  get ref(): Observable<IDialogRef> {
    return this._dialogRef$.asObservable();
  }
  // open(ref: any, body: IContent): Observable<IDialogRef> {
  open(component: any, context: IContext | null = null): void {
    // this.setComponent(component);
    this._dialogRef = {
      component,
      isOpen: true,
      // header: context?.header,
    };
    this._dialogRef$.next(this._dialogRef);
    // return this.ref$.asObservable();
  }
  // async setComponent(ref: AuthComponent) {
  //  const { ref } = await import("src/app/pages/auth/components/auth/auth.component");
  // }
  close() {
    this._dialogRef$.next({ ...this._dialogRef, isOpen: false });
    // this._dialogRef$.forEach(dialog => dialog.component.destroy());
  }
}
