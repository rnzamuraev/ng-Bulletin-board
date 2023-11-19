import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { NotFoundPageComponent } from './not-found-page.component'

const routes: Routes = [
  {
    path: "",
    component: NotFoundPageComponent,
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class NotFoundPageRoutingModule { }
