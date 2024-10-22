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
import { AddAnimalCategoryComponent } from './Admin/add-animal-category/add-animal-category.component';
import { GetAllCategoryComponent } from './Admin/get-all-category/get-all-category.component';
import { OurCommunityDetailsComponent } from './ayah/our-community-details/our-community-details.component';
import { ShowAnimalsComponent } from './show-animals/show-animals.component';
import { AddAnimalsComponent } from './Admin/add-animals/add-animals.component';
import { EditAnimalsComponent } from './Admin/edit-animals/edit-animals.component';
import { FormsModule } from '@angular/forms';
import { AddShelterComponent } from './Admin/add-shelter/add-shelter.component';
import { EditShelterComponent } from './Admin/edit-shelter/edit-shelter.component';
import { AnimalsDetailsComponent } from './Duha/./animals-details/animals-details.component';
import { GetAnimalsAdminComponent } from './Admin/get-animals-admin/get-animals-admin.component';


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
    AddAnimalCategoryComponent,
    GetAllCategoryComponent,
    AddAnimalCategoryComponent,
    OurCommunityDetailsComponent,
    OurCommunityDetailsComponent,
    DashboardComponent,
    ShowAnimalsComponent,
    AddAnimalsComponent,
    EditAnimalsComponent,

    AddShelterComponent,
    EditShelterComponent,
    AnimalsDetailsComponent,
    GetAnimalsAdminComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule  
,
    RouterModule.forRoot([
      //Ueser
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "abuot", component: AbuotComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
     
      { path: "OurCommunityDetails/:id", component: OurCommunityDetailsComponent },


      { path: "ShowAnimals", component: ShowAnimalsComponent },
      { path: "AnimalsDetails", component: AnimalsDetailsComponent }


      ,



      //AdminDashboard
      {
        path: "dashboard",
        component: DashboardComponent,
        children: [
          {
             path: "register", component: RegisterComponent ,
          },
          { path: "getAllCategory", component: GetAllCategoryComponent },
          { path: "addAnimalCategory", component: AddAnimalCategoryComponent }
        ]

      },

            path: "register",
            component: RegisterComponent
          },
          {
            path: "getAnimalsAdmin",
            component: GetAnimalsAdminComponent
          }
        ]
      }


    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
   
 
})
export class AppModule { }
