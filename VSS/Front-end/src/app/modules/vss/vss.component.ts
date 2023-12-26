import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';

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
  constructor(private _router: Router, private _userService: UserService, private _userDialog: MatDialog){}
  ngOnInit(): void {
    if(localStorage.getItem('userId')){
      this.userId = localStorage.getItem('userId')
    }
    this.getUserDetails()
  }
  onExit(){
    console.log("User Id in VSS: ", this.userId)
    localStorage.clear()
    this._router.navigate(['/login'])
  }

  getUserDetails(){
    this._userService.getUser(this.userId)
    .subscribe((res: any) => {
      this.user = res
      console.log("USER DETAILS IN VSS: ", this.user)
    })
  }

  userProfile(){
    // var data = {
    //   name:  this.user.name,
    //   email: this.user.email,
    //   contactNumber: this.user.contactNumber,
    //   department: this.user.department,
    //   img: this.user.img
    // }
    // console.log("This.Data: ", data)
    const  dialogConfig = new MatDialogConfig()
    dialogConfig.width = '400px'
    dialogConfig.position = {top:'10px'}
    dialogConfig.autoFocus = true
    const dialgoRef = this._userDialog.open(ProfileComponent, dialogConfig)
  }

ngOnDestroy(): void {
  this.userId = ''
}
  
}
