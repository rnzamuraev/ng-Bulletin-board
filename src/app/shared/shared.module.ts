import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "src/app/shared/components/components.module";
import { NgModulesModule } from "src/app/shared/ng-modules/ng-modules.module";
import { PrimeNgModule } from "src/app/shared/prime-ng/prime-ng.module";

@NgModule({
  declarations: [],
  exports: [CommonModule, ComponentsModule, PrimeNgModule, NgModulesModule],
})
export class SharedModule {}
