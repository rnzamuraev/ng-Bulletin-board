import { TestBed } from "@angular/core/testing";
import { ResolveFn } from "@angular/router";

import { notFoundResolver } from "./not-found.resolver";
import { Observable } from "rxjs";

describe("notFoundResolver", () => {
  const executeResolver: ResolveFn<Observable<boolean>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => notFoundResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(executeResolver).toBeTruthy();
  });
});
