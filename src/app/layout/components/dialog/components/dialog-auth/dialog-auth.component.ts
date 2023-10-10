import {
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { DialogService } from "../../services/dialog-service/dialog.service";
import { Subscription } from "rxjs";
// import { AuthComponent } from "src/app/pages/auth/components/auth/auth.component";

@Component({
  selector: "app-dialog-auth",
  templateUrl: "./dialog-auth.component.html",
  styleUrls: ["./dialog-auth.component.scss"],
})
export class DialogAuthComponent implements OnInit, OnDestroy {
  private _unsubscribeRef!: Subscription;
  // header!: string;
  contentRef!: any;
  isOpen!: boolean;
  @ViewChild("content", { read: ViewContainerRef })
  containerRef!: ViewContainerRef;

  constructor(private dialog: DialogService) {}

  ngOnInit(): void {
    this.initializeDialog();
  }

  initializeDialog() {
    this._unsubscribeRef = this.dialog.ref.subscribe(data => {
      this._createComponent(data.component);
      this._setIsOpen(data.isOpen);
    });
  }
  private _createComponent(value: any) {
    this.containerRef.createComponent(value);
  }
  private _setIsOpen(value: boolean) {
    this.isOpen = value;
  }
  onClose() {
    this.dialog.close();
  }

  ngOnDestroy(): void {
    this._unsubscribeRef.unsubscribe();
  }
}
