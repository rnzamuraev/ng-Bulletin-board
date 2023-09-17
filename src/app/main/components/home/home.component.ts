import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/shared/services/data.service";
import { IProd } from "src/app/shared/types/products.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  // public products!: IProduct[];
  public products!: { prod: IProd; price: number }[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.dataService.getProducts().subscribe(data => {
      console.log();
      this.products = data;
    });
  }
}
