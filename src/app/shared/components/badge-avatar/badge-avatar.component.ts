import { Component, Input } from "@angular/core";

@Component({
  selector: "app-badge-avatar",
  templateUrl: "./badge-avatar.component.html",
  styleUrls: ["./badge-avatar.component.scss"],
})
export class BadgeAvatarComponent {
  @Input()
  public nameProps!: string;

  @Input()
  public avatarProps!: string;
}
