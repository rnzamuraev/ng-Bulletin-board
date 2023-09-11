import { Component } from "@angular/core";
import { IProd, IProduct } from "src/app/shared/types/products.interface";

@Component({
  selector: "app-my-announcements-page",
  templateUrl: "./my-announcements-page.component.html",
  styleUrls: ["./my-announcements-page.component.scss"],
})
export class MyAnnouncementsPageComponent {
  public products!: { prod: IProd; price: number }[];
}
