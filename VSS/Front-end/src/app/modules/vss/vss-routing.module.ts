import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VssComponent } from './vss.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { RouteGuardService } from '../../services/route-guard.service';
import { EmpMgmtComponent } from './emp-mgmt/emp-mgmt.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { 
    path: '', 
    component: VssComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin','user']
        }
      },

      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin','user']
        }
      },
      
      {
        path: 'empMgmt',
        component: EmpMgmtComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin']
        }
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
