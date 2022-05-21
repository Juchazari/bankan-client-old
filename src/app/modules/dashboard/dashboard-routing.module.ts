import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardResolver } from './resolvers';
import { DashboardComponent } from './dashboard.component';
import { BoardPageComponent } from './board-page/board-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'boards/:id',
        component: BoardPageComponent,
        resolve: {
          board: BoardResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BoardResolver]
})
export class DashboardRoutingModule {}
