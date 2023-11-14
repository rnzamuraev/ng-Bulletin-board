import { Injectable } from "@angular/core";
import { ICityStorage } from "../../types/query-params.interface";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  get(key: string): any {
    let data!: any;
    try {
      console.log(localStorage.getItem(key));
      data = localStorage.getItem(key);
      if (typeof data === "string") data = JSON.parse(data);
      else data = null;
    } catch (error) {
      console.error("Error getting data from LocalStorage", error);
      data = null;
    }
    return data;
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to LocalStorage", error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error remove to LocalStorage", error);
    }
  }
}
