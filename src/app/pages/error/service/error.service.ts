import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  error = new BehaviorSubject<string>("");

  constructor() {}

  get getError(): Observable<string> {
    return this.error;
  }
  setError(err: string): void {
    this.error.next(err);
  }
}
