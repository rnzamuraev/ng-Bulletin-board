import { TestBed } from "@angular/core/testing";
import { ResolveFn } from "@angular/router";

import { notFoundAdvertInfoResolver } from "./not-found-advert-info.resolver";
import { Observable } from "rxjs";

describe("notFoundAdvertInfoResolver", () => {
  const executeResolver: ResolveFn<Observable<boolean>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => notFoundAdvertInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(executeResolver).toBeTruthy();
  });
});
