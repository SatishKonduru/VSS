import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snakbar: MatSnackBar) { }

  openSnackbar(msg: string, action: string){
    if(action === 'error'){
      this._snakbar.open(msg, '' , {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['error-snackbar']
      })
    }
    else{
      this._snakbar.open(msg, '' , {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['success-snackbar']
      })
    }
  }

}
