import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VssModule } from './modules/vss/vss.module';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';



const ngxUiLoaderConfig : NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: 'orange',
  textPosition: 'center-center',
  pbColor: 'orange',
  bgsColor: 'orange',
  fgsColor: 'orange',
  fgsType: SPINNER.foldingCube,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    VssModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    UserService,
    DashboardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
