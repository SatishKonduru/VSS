import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vss',
  templateUrl: './vss.component.html',
  styleUrl: './vss.component.css'
})

export class VssComponent implements OnInit, OnDestroy{

  collapsed = signal(false)
  user : any ;
  public userId: any =''
  
  sidenavWidth = computed(()=>  this.collapsed() ? '65px' : '250px')
  constructor(private _router: Router, private _userService: UserService){}
  ngOnInit(): void {
  }
  onExit(){
    console.log("User Id in VSS: ", this.userId)
    localStorage.clear()
    this._router.navigate(['/login'])
  }



ngOnDestroy(): void {
  this.userId = ''
}
  
}
