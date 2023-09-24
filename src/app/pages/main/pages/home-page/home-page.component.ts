import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/shared/services/data.service";
import { IProd } from "src/app/shared/types/products.interface";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  // public products!: IProduct[];
  city = "Севастополь";
  products!: { prod: IProd; price: number }[];
  routerLink!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.dataService.getProducts().subscribe(data => {
      this.products = data;
      const p = data.map(p => {
        p.prod;
        return {
          rarity: p.prod.rarity,
          type: p.prod.type,
        };
      });
      console.log(p);
    });
  }
}
