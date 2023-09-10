import { Component, Input } from "@angular/core";
import { IProd } from "../../types/products.interface";
// import { IProduct } from '../../types/products.interface'

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent {
  public prod!: { prod: IProd; price: number };

  @Input()
  // public prodProps!: IProd;
  public set prodProps(props: { prod: IProd; price: number }) {
    console.log(props.prod.images);
    this.prod = props;
  }
}
