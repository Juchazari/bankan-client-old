import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoardPageComponent } from './board-page/board-page.component';
import {
  SidebarComponent,
  TopBarComponent,
  BoardNotFoundComponent,
  SectionComponent,
  TaskComponent,
  NewBoardDialogComponent
} from './components';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    BoardPageComponent,
    SidebarComponent,
    TopBarComponent,
    BoardNotFoundComponent,
    SectionComponent,
    TaskComponent,
    NewBoardDialogComponent
  ]
})
export class DashboardModule {}
