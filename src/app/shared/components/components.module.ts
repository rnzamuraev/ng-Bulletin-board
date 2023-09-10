import { NgModule } from "@angular/core";

import { BadgeAvatarComponent } from "./badge-avatar/badge-avatar.component";
import { BeforeLoginComponent } from "./before-login/before-login.component";
import { LoadingComponent } from "./loading/loading.component";
import { CardComponent } from "./card/card.component";
import { ItemPageComponent } from './item-page/item-page.component';

@NgModule({
  declarations: [BadgeAvatarComponent, BeforeLoginComponent, LoadingComponent, CardComponent, ItemPageComponent],
  exports: [BadgeAvatarComponent, BeforeLoginComponent, LoadingComponent, CardComponent],
})
export class ComponentsModule {}
