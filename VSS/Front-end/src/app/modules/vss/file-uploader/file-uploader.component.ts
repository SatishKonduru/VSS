import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {
  @Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
  @ViewChild('fileUpoader',{static: false}) fileUpoader: ElementRef<HTMLElement>;
  public image      : string = '';
  public imageName  : string = '';

  triggerClick() {
    let fileElement: HTMLElement = this.fileUpoader.nativeElement;
    fileElement.click();
}
selectFile(event: Event) {
  const file      = (event.target as HTMLInputElement).files[0];
  this.imageName  = file.name;
  // Preview image
   if (file) {
    const reader  = new FileReader();
    reader.onload = () => {
      this.image  = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.onFileSelect.emit(file);
  }
}




}
