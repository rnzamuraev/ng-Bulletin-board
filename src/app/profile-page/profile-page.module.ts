import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsPageComponent } from "./settings-page/settings-page.component";
import { NewAnnouncementPageComponent } from "./new-announcement-page/new-announcement-page.component";
import { MyAnnouncementsPageComponent } from "./my-announcements-page/my-announcements-page.component";
import { ProfilePageComponent } from "./profile-page.component";

@NgModule({
  declarations: [
    SettingsPageComponent,
    NewAnnouncementPageComponent,
    MyAnnouncementsPageComponent,
    ProfilePageComponent,
  ],
  imports: [CommonModule],
})
export class ProfilePageModule {}
