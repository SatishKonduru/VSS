import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;

selectFile(event: any): void {
  this.message = '';
  this.preview = '';
  this.progress = 0;
  this.selectedFiles = event.target.files;

  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);

    if (file) {this.preview = '';
    this.currentFile = file;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      console.log(e.target.result);
      this.preview = e.target.result;
    };

    reader.readAsDataURL(this.currentFile);
  }
}
}

upload(): void {
  this.progress = 0;

  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;

      this._userService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.imageInfos = this._userService.getFiles();
          }
        },error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the image!';
          }

          this.currentFile = undefined;
        },
      });
    }


  }
}
}