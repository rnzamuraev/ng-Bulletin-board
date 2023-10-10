import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SettingsPageRoutingModule } from "./settings-page-routing.module";
import { SettingsPageComponent } from "./settings-page.component";

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [CommonModule, SettingsPageRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [SettingsPageComponent],
})
export class SettingsPageModule {}
