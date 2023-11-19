import { Component } from "@angular/core";
import { ErrorService } from "../../service/error.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.scss"],
})
export class ErrorPageComponent {
  errors!: string[];

  constructor(private error: ErrorService, private router: Router, private location: Location) {
    this.error.getError.subscribe(error => {
      this.errors = [error];
    });
  }
  onGoTo(link: string): void {
    if (link === "back") {
      this.location.back();
      return;
    }
    this.router.navigateByUrl(`/${link}`);
  }
}
