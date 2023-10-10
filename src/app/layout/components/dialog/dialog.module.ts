import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogService } from "./services/dialog-service/dialog.service";
import { DialogAuthComponent } from "./components/dialog-auth/dialog-auth.component";

@NgModule({
  declarations: [DialogAuthComponent],
  imports: [CommonModule],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [DialogService],
    };
  }
}
