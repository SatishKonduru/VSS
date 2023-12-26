import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent  implements OnInit{
  onEmitStatusChage = new EventEmitter()
  details: any = {}
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:  any){}
  ngOnInit(): void {
    if(this.dialogData){
      this.details = this.dialogData
    }

  }
  handleChangeAction(){
    this.onEmitStatusChage.emit()
  }
}
