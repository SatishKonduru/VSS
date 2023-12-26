import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VssRoutingModule } from './vss-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { VssComponent } from './vss.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpMgmtComponent } from './emp-mgmt/emp-mgmt.component';
import { EmpComponent } from './emp/emp.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    VssComponent,
    DashboardComponent,
    EmployeesComponent,
    CustomSidenavComponent,
    EmpMgmtComponent,
    EmpComponent,
    ConfirmationComponent,
    ProfileComponent
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
