import { Component, Input, computed, signal } from '@angular/core';


export  type Menu =  {
  icon: string,
  label: string,
  route: string,
  role: string
}
@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  sidenavCollapsed = signal(false)
  @Input() set collapsed(val: boolean){
    this.sidenavCollapsed.set(val)
  }
    menuItems = signal<Menu[]>([
      {
          icon: 'dashboard',
          label: 'Dashboard',
          route: 'dashboard',
          role:""
      },
      {
        icon: 'supervisor_account',
        label: 'Employees',
        route: 'employees',
        role:""
    }
    ])
  
  profilePicSize = computed(()=> this.sidenavCollapsed() ? '32' : '80')

}
