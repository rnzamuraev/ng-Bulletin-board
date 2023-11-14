import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NewItemPageRoutingModule } from "./new-item-page-routing.module";
import { NewItemPageComponent } from "./new-item-page.component";
import { FormDropdownComponent } from "./components/form-dropdown/form-dropdown.component";
import { InputFieldErrorComponent } from "src/app/shared/components/input-field-error/input-field-error.component";
import { InputNumberComponent } from "src/app/shared/components/input-number/input-number.component";

@NgModule({
  declarations: [NewItemPageComponent, FormDropdownComponent],
  imports: [
    CommonModule,
    NewItemPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputNumberComponent,
    InputFieldErrorComponent,
  ],
  exports: [NewItemPageComponent],
})
export class NewItemPageModule {}
