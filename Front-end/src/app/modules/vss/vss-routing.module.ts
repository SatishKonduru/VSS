import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VssComponent } from './vss.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';


const routes: Routes = [
  { 
    path: '', 
    component: VssComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      }
    ]
  }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    
  ],
  exports: [RouterModule]
})
export class VssRoutingModule { }
