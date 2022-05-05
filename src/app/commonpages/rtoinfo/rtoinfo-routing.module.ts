import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RtoinfoPage } from './rtoinfo.page';

const routes: Routes = [
  {
    path: '',
    component: RtoinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RtoinfoPageRoutingModule {}
