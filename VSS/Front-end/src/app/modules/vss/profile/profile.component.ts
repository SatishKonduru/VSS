import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  user : any ;
  public userId: any =''
  selectedImage: File;
  constructor(private _userService: UserService){  }

  ngOnInit(): void {
    if(localStorage.getItem('userId')){
      this.userId = localStorage.getItem('userId')
    }
    this.getUserDetails()
  }

  getUserDetails(){
    this._userService.getUser(this.userId)
    .subscribe((res: any) => {
      this.user = res
      console.log("USER DETAILS IN VSS: ", this.user)
    })

  }


//file upload
onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
}

uploadImage() {
  var id = this.user.id

}






}
