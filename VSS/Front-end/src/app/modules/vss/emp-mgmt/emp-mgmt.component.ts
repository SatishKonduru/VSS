import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { globalProperties } from '../../../shared/globalProperties';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpComponent } from '../emp/emp.component';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
// import { slideInFromLeft } from '../../../shared/animations';

@Component({
  selector: 'app-emp-mgmt',
  templateUrl: './emp-mgmt.component.html',
  styleUrl: './emp-mgmt.component.css',
  // animations: [slideInFromLeft]
})
export class EmpMgmtComponent implements OnInit{
  displayedColumns: string[] = ['name','department','task','progress','status','actions']
  dataSource: any;
  responseMsg: any = ''
  searchKey : string = ''
  length: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort
  constructor(
    private _userService: UserService,
    private _ngxService: NgxUiLoaderService,
    private _snackbar: SnackbarService,
    private _userDialog: MatDialog,
    private _router: Router
    
    ){}

    ngOnInit(): void { 
      // document.body.classList.add('slide-in-from-left');
      this._ngxService.start()
      this.getEmployeeList()
      
  
    }
    getEmployeeList(){
      this._userService.getUsersList()
      .subscribe((res: any) => {
        console.log("RES: ", res)
        this._ngxService.stop()
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }, (err: any) => {
        this._ngxService.stop()
        if(err.error?.message){
          this.responseMsg = err.error?.message
        }
        else{
            this.responseMsg = globalProperties.genericError
        }
       this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
      })
    }


    
    applyFilter(filterValue : string){
      this.dataSource.filter = filterValue.trim().toLowerCase()
    }
    onSearchClear(){
      this.searchKey = ''
      this.applyFilter('')
    }

    onChange(status: any, id: any){
      console.log("Status: ", status)
        var data = {
          status: status.toString(),
          id: id
        }
        this._userService.updateStatus(data)
        .subscribe((res: any) => {
          this.responseMsg = res?.message
          this._snackbar.openSnackbar(this.responseMsg, 'success')
        }, (err: any) => {
          if(err.error?.message){
            this.responseMsg = err.error?.message
          }
          else{
            this.responseMsg = globalProperties.genericError
          }
          this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
        })
    }


    editEmp(emp: any){
      const dialogConfig =  new MatDialogConfig()
      dialogConfig.data = {
        action: 'Edit',
        data: emp
      }
      console.log("Attempting Edit Data: ",  dialogConfig.data )
      dialogConfig.width = '385px'
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true
      dialogConfig.position = {top: '10px'}
      // dialogConfig.panelClass = 'slide-in-from-right';
      const dialogRef = this._userDialog.open(EmpComponent, dialogConfig)
      this._router.events.subscribe(()=>{dialogRef.close()})
      dialogRef.componentInstance.onEditEmp.subscribe((res: any) => {
        this.getEmployeeList()
      })
    }

    deleteEmp( emp: any){
      // this.dataSource.splice(value, 1)
      // this.dataSource = [...this.dataSource]
      // this.length = this.dataSource.length
      // this.dataSource.paginator = this.paginator
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width =  '400px'
      dialogConfig.position = {top: '10px'}
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true
      dialogConfig.data = {
        message: 'Are you sure for Delete Employee:  '+emp.name
      }
      const dialogRef =  this._userDialog.open(ConfirmationComponent, dialogConfig)
      dialogRef.componentInstance.onEmitStatusChage.subscribe((res: any) => {
        this._ngxService.start()
        this.delete(emp.id)
        dialogRef.close()
      })
    }
    delete(id: any){
      this._userService.delete(id)
      .subscribe((res: any) => {
        this._ngxService.stop()
        this.getEmployeeList()
        this.responseMsg = res?.message
        this._snackbar.openSnackbar(this.responseMsg, 'success')
      }, (err: any) => {
        this._ngxService.stop()
        if(err.error?.message){
          this.responseMsg = err.error?.message
        }
        else{
          this.responseMsg = globalProperties.genericError
        }
        this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
      })
    }

}
