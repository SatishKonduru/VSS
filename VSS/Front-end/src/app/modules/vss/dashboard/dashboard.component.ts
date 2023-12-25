import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../services/snackbar.service';
import { globalProperties } from '../../../shared/globalProperties';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
responseMsg: any = ''
data : any;
constructor(
  private _dashboardService: DashboardService,
  private _ngxService: NgxUiLoaderService,
  private _snackbar: SnackbarService
){}

ngOnInit(): void {
  this._ngxService.start()
  this.getDashboardData()
}
getDashboardData(){
  this._dashboardService.getDashboardDetails()
  .subscribe((res: any) => {
    this._ngxService.stop()
    this.data = res
  },(err: any) => {
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg= err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })

}
}
