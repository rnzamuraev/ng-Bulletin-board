import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Observable, map, of, switchMap } from "rxjs";
import { OpenService } from "../../services/open-service/open.service";
import { QueryParamsService } from "../../services/query-params-service/query-params.service";
import { UserService } from "../../services/user-service/user.service";
import { IUser } from "../../types/user.interface";
import { AdvertService } from "../../services/adverts-service/advert.service";

export const authGuard: CanActivateFn = (_route, state): Observable<boolean> => {
  let isLoading!: boolean;
  const queryParamsService = inject(QueryParamsService);
  const userService = inject(UserService);
  const openService = inject(OpenService);
  const advertService = inject(AdvertService);
  const router = inject(Router);

  queryParamsService.getIsLoadingApp$.subscribe((isData: boolean) => {
    isLoading = isData;
  });
  console.log(isLoading);

  // return userService.getCurrentUser$.pipe(
  //   map((data: IUser | null) => {
  //     if (data) return true;
  //     else return false;
  //   }),
  //   switchMap(isData => {
  //     if (isData) {
  //       console.log("User true");
  //       return of(true);
  //     } else
  return userService.fetchCurrentUser().pipe(
    map((data: IUser | null) => {
      console.log(state.url);
      if (data) {
        console.log("user");
        userService.setCurrentUser(data);
        advertService.setIsEdit(false);
        openService.closeAuth(null);
        return true;
      }
      if (!data && isLoading) {
        console.log("lk - redirect");
        queryParamsService.setIsLoadingApp(false);
        router.navigate(["/"]);
        return false;
      }
      console.log("openAuth");
      openService.openAuth(state.url);
      return false;
    })
  );
  //     })
  //   );
};
