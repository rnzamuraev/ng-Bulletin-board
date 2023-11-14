import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { Observable, map, of, switchMap } from "rxjs";
import { BreadcrumbsService } from "../../services/breadcrumbs-service/breadcrumbs.service";
import { CategoryService } from "../../services/category-service/category.service";
import { ErrorMessageService } from "../../services/error-message-service/error-message.service";
import { QueryParamsService } from "../../services/query-params-service/query-params.service";
import { IBreadcrumbs } from "../../types/breadcrumbs.interface";
import { ICategoryChild } from "../../types/category.interface";

export const notFoundResolver: ResolveFn<Observable<boolean>> = (
  route,
  state
): Observable<boolean> => {
  console.log(route);
  console.log(state);
  let isErrorPage!: boolean;
  const arrayParams: string[] = [];
  const breadcrumbs: IBreadcrumbs[] = [];

  const categoryService = inject(CategoryService);
  const errorMessageService = inject(ErrorMessageService);
  const queryParamsService = inject(QueryParamsService);
  const breadcrumbsService = inject(BreadcrumbsService);
  const router = inject(Router);
  const city = queryParamsService.getCity;

  if (`/${city}` === state.url) {
    router.navigate(["/"]);
    return of(false);
  }
  // breadcrumbsService.setLengthBreadcrumbs(state.url.split("/").slice(2));

  if (route.params["category"]) arrayParams.push(route.params["category"]);
  if (route.params["subcategory"]) arrayParams.push(route.params["subcategory"]);
  if (route.params["sub-subcategory"]) arrayParams.push(route.params["sub-subcategory"]);

  console.log(arrayParams);
  //** Получаем и устанавливаем последовательно элементы хлебных крошек */
  const setBreadcrumbsItems = (category: ICategoryChild, index: number, routes: string[]): void => {
    let link = city;
    // if (routes.filter((elem: string) => elem === `${EStaticVar.PAGE_INFO}`).length > 0)
    routes.forEach((elem: string, i: number) => {
      if (i > index) return;
      link += `/${elem}`;
    });
    breadcrumbs.push({ link, label: category.name, category: category });
  };
  //** Получаем категорию для проверки на совпадение в строке 'Url' и установки хлебных крошек */
  const getCategoryChild = (categories: ICategoryChild[], i: number) => {
    let category!: ICategoryChild;
    let isCoincidence = false;
    categories.forEach((elem: ICategoryChild) => {
      if (arrayParams[i] !== queryParamsService.transliter(elem.name)) {
        return;
      }
      isCoincidence = true;
      console.log("Совпадение есть: ", i);
      category = elem;
      setBreadcrumbsItems(elem, i, arrayParams);
    });

    if (isCoincidence && arrayParams.length - 1 === i) {
      console.log("Итерация закончена: ");
      breadcrumbsService.setBreadcrumbs(breadcrumbs);
      errorMessageService.setIsNotFoundPage(false);
      return;
    }
    if (isCoincidence) {
      console.log("на новый круг: ");
      getCategoryChild(category.childs, i + 1);
      return;
    }

    console.log("error: ", arrayParams[i], "iter: ", i);
    console.log(isCoincidence);
    errorMessageService.setIsNotFoundPage(true);
    return;
  };

  console.log(route.params["category"]);
  if (route.params["category"])
    return categoryService.getCategoryChildList$.pipe(
      switchMap((data: ICategoryChild[] | null) => {
        if (data) return of(data);
        return categoryService.fetchCategories();
      }),
      map((data: ICategoryChild[]) => {
        // categoryService.setCategoryChildList(data);
        getCategoryChild(data, 0);

        if (isErrorPage) return false;
        else return true;
      })
    );
  else return of(true);
};
