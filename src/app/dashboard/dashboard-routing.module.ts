import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';

// localhost://dashboard
const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'new',
        component: NewPageComponent,
      },
      {
        path: 'edit/:id',
        component: NewPageComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
