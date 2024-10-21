import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { FooterComponent } from './home/footer/footer.component';
import { AbuotComponent } from './home/abuot/abuot.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ShowAnimalsComponent } from './show-animals/show-animals.component';
import { AddAnimalsComponent } from './Admin/add-animals/add-animals.component';
import { EditAnimalsComponent } from './Admin/edit-animals/edit-animals.component';

import { AddShelterComponent } from './Admin/add-shelter/add-shelter.component';
import { EditShelterComponent } from './Admin/edit-shelter/edit-shelter.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    AbuotComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ShowAnimalsComponent,
    AddAnimalsComponent,
    EditAnimalsComponent,

    AddShelterComponent,
    EditShelterComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      //Ueser
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "abuot", component: AbuotComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "ShowAnimals", component: ShowAnimalsComponent }


      ,


      //AdminDashboard
      {
        path: "dashboard", component: DashboardComponent, children: [
          {
             path: "register", component: RegisterComponent ,
          }]

      },



    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
   
 
})
export class AppModule { }
