import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatTableDataSource } from '@angular/material/table';
import { globalProperties } from '../../../shared/globalProperties';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['name','email','contactNumber','department','task','progress']
  dataSource: any;
  responseMsg: any = ''
  searchKey : string = ''
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort
  constructor(
    private _userService: UserService,
    private _ngxService: NgxUiLoaderService,
    private _snackbar: SnackbarService
    ){}

    ngOnInit(): void { 
      this._ngxService.start()
      this.getEmployeeList()
    }
    getEmployeeList(){
      this._userService.getUsersList()
      .subscribe((res: any) => {
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

}
