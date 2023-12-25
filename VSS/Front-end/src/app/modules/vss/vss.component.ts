import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vss',
  templateUrl: './vss.component.html',
  styleUrl: './vss.component.css'
})

export class VssComponent {

  collapsed = signal(false)
  sidenavWidth = computed(()=>  this.collapsed() ? '65px' : '250px')
  constructor(private _router: Router){}
  
  onExit(){
    localStorage.clear()
    this._router.navigate(['/login'])
  }

}
