import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { IBreadcrumbs } from "src/app/shared/types/breadcrumbs.interface";
import { BreadcrumbsService } from "../../services/breadcrumbs-service/breadcrumbs.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class BreadcrumbsComponent implements OnDestroy {
  private _unGetBreadcrumbs!: Subscription;

  breadcrumbs!: IBreadcrumbs[];

  // @Input()
  // isProductInfoProps!: boolean;

  // @Output()
  // getLinkBreadcrumbs = new EventEmitter<IBreadcrumbs | null>();

  constructor(private breadcrumbsService: BreadcrumbsService, private router: Router) {
    this._initialSetBreadcrumbs();
  }

  private _initialSetBreadcrumbs() {
    this._unGetBreadcrumbs = this.breadcrumbsService.getBreadcrumbs$.subscribe(
      (data: IBreadcrumbs[] | null) => {
        if (data) this.breadcrumbs = data;
      }
    );
  }

  onGoTo(link: string) {
    this.router.navigateByUrl(`/${link}`);
    // this.getLinkBreadcrumbs.emit(obj);
  }

  ngOnDestroy(): void {
    this._unGetBreadcrumbs.unsubscribe();
  }
}
