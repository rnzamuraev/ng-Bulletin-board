import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NewItemPageRoutingModule } from "./new-item-page-routing.module";
import { NewItemPageComponent } from "./new-item-page.component";
import { FormDropdownComponent } from './components/form-dropdown/form-dropdown.component';

@NgModule({
  declarations: [NewItemPageComponent, FormDropdownComponent],
  imports: [
    CommonModule,
    NewItemPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  exports: [NewItemPageComponent],
})
export class NewItemPageModule {}
