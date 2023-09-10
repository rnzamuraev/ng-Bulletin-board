import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  get(key: string) {
    try {
      const data = localStorage.getItem(key);
      if (typeof data === "string") return JSON.parse(data);
      else if (!data) return null;
    } catch (error) {
      console.error("Error getting data from LocalStorage", error);
      return null;
    }
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
      console.error("Error saving to LocalStorage", error);
    }
  }
}
