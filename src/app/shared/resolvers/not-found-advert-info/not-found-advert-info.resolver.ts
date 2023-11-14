import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Observable, map } from "rxjs";
import { AdvertService } from "../../services/adverts-service/advert.service";
// import { CategoryService } from "../../services/category-service/category.service";
import { ErrorMessageService } from "../../services/error-message-service/error-message.service";
import { QueryParamsService } from "../../services/query-params-service/query-params.service";
import { IAdvertById } from "../../types/adverts.interface";
// import { ICategoryChild } from "../../types/category.interface";
// import { BreadcrumbsService } from "../../services/breadcrumbs-service/breadcrumbs.service";
import { ICategory } from "../../types/category.interface";
// import { IBreadcrumbs } from '../../types/breadcrumbs.interface'
// import { CategoryService } from '../../services/category-service/category.service'

export const notFoundAdvertInfoResolver: ResolveFn<Observable<boolean>> = (
  route,
  state
): Observable<boolean> => {
  // let isErrorPage!: boolean;
  let id!: string;
  let edit!: string;
  // let category!: ICategory;
  // const breadcrumbs:IBreadcrumbs[]=[]
  const link = state.url.split("/").slice(-1)[0];
  console.log(state.url);
  console.log(link);

  const advertService = inject(AdvertService);
  // const categoryService = inject(CategoryService);
  const errorMessageService = inject(ErrorMessageService);
  const queryParamsService = inject(QueryParamsService);
  // const breadcrumbsService = inject(BreadcrumbsService);

  if (route.params["info"]) id = route.params["info"].split("_").slice(-1)[0];
  if (state.url.split("/").slice(-2, -1)[0] === "edit") advertService.setIsEdit(true);

  return advertService.fetchAdvertById(id).pipe(
    map((data: IAdvertById | null) => {
      // console.log(isErrorPage);
      if (data)
        if (queryParamsService.transliter(data?.name + "_" + id) === link) {
          console.log(queryParamsService.transliter(data?.name + "_" + id) === link);
          // category = data.category;
          advertService.setAdvert(data);
          // setBreadcrumbsItemPage(data.category, state.url, true);
          errorMessageService.setIsNotFoundPage(false);
          return true;
        }
      errorMessageService.setIsNotFoundPage(true);
      return false;
    })
  );
};
