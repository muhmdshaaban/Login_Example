import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';
import { RegisterComponent } from './register/register.component';
import { UsersService } from './services/users.service';
import { ProfileComponent } from './profile/profile.component';


const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },

  {
    path: 'admin'
    , component: AdminComponent
    , canActivate: [AuthGuardService, AdminGuardService]
  },
  { path: 'noaccess', component: NoAccessComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    NoAccessComponent,
    NavComponent,
    ProductsComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule
  ],
  providers: [AuthService, UsersService, ProductsService, AuthGuardService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
