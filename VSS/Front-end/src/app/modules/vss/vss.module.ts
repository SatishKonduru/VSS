import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VssRoutingModule } from './vss-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { VssComponent } from './vss.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VssComponent,
    DashboardComponent,
    EmployeesComponent,
    CustomSidenavComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    VssRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VssModule { }
