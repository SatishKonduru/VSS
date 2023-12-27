import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  user : any ;
  public userId: any =''
  imgForm: any =  FormGroup
  isPhotoError = false;
  image: string;
  submitted : boolean = false;
  uploadError: string = '';
  constructor(private _userService: UserService, private _formBuilder: FormBuilder, private _snackbar: SnackbarService){  }

  ngOnInit(): void {
    
    this.imgForm = this._formBuilder.group({
      photo: [null,[Validators.required]]
    })

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
PostData() {
  this.submitted = true;
  if(!this.imgForm.valid) {
    return false;
  }
  if (this.imgForm.get('photo').invalid) {
    this.isPhotoError = true;
  }
  this.uploadError = '';
  const data = this.imgForm.value;
  var photoValue = data.photo
  console.log("Photo value:", photoValue);
  const formData = new FormData();
  formData.append('photo', photoValue);

  
  // this.http.post('http://localhost:8082/upload', formData).subscribe(resp => {
  //   if(resp['status'] == 'success') {
  //     alert('File saved in file-upload-server/uploads');
  //   }
  // }, (resp)=> {
  //   this.uploadError = 'Some error occured please try later';
  //   console.log(resp);
  // });
  this._userService.upload(formData).subscribe(resp => {
    if(resp['message'] == 'success') {
      this._snackbar.openSnackbar('File saved in file-upload-server/uploads', '')
      // alert('File saved in file-upload-server/uploads');
    }
  }, (resp)=> {
    // this.uploadError = 'Some error occured please try later';
    this._snackbar.openSnackbar('Some error occured please try later', 'error')
    console.log(resp);
  });

}

onFileSelect(file: Event) {
  this.imgForm.patchValue({ photo: file });
  this.imgForm.get('photo').updateValueAndValidity();
}




}