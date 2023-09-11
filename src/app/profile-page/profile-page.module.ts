import { NgModule } from "@angular/core";
import { SettingsPageComponent } from "./components/settings-page/settings-page.component";
import { NewAnnouncementPageComponent } from "./components/new-announcement-page/new-announcement-page.component";
import { MyAnnouncementsPageComponent } from "./components/my-announcements-page/my-announcements-page.component";
import { ProfilePageComponent } from "./profile-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ProfilePageComponent,
    SettingsPageComponent,
    NewAnnouncementPageComponent,
    MyAnnouncementsPageComponent,
  ],
  imports: [SharedModule, RouterModule],
})
export class ProfilePageModule {}
