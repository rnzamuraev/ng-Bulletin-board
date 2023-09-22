import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IProd, IProduct } from "src/app/shared/types/products.interface";

@Component({
  selector: "app-card-product",
  templateUrl: "./card-product.component.html",
  styleUrls: ["./card-product.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CardProductComponent {
  // public prod!: { prod: IProd; price: number };
  @Input()
  productProps!: IProduct;

  @Input()
  prodProps!: { prod: IProd; price: number };

  @Input()
  routerLinkTitlesProps!: string;

  @Output()
    getIdAndTitle = new EventEmitter<{id: number, title:string}>()

  onGetIdAndTitle(id: number, title:string) {
    this.getIdAndTitle.emit({id, title})
  }
}
