import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


const materialComponents = [
   MatIconModule,
   MatInputModule,
   MatListModule,
   MatMenuModule,
   MatPaginatorModule,
   MatSnackBarModule,
   MatSortModule,
   MatTableModule,
   MatToolbarModule,
   MatTooltipModule,
   MatSidenavModule,
   MatButtonModule,
   MatExpansionModule,
   MatSelectModule,
   MatDialogModule,
   MatCardModule,
   MatSlideToggleModule
]
@NgModule({
   imports: [materialComponents],
   exports: [materialComponents]
})
export class AngularMaterialModule { }
